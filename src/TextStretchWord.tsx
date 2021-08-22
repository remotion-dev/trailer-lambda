import React, {useEffect, useRef} from 'react';
import {interpolate} from 'remotion';
import {getStretchRanges} from './get-stretch-points';
import {measureText} from './measure-text';

const cache: {[key: string]: number} = {};

const areaOfRanges = (ranges: [number, number][], weights: number[]) => {
	const totalWeights = weights.reduce((a, b) => a + b, 0);
	const avgWeight = totalWeights / weights.length;
	return ranges.reduce((a, b, i) => {
		return a + ((b[1] - b[0]) * weights[i]) / avgWeight;
	}, 0);
};

type LetterCallbackObject = {
	letter: string;
	nthLetter: number;
};

const stretchFn = (
	y: number,
	originalWidth: number,
	targetWidth: number,
	ranges: [number, number][],
	weights: number[]
) => {
	if (weights.length !== ranges.length) {
		throw new Error('Weights array must be the same as ranges array');
	}
	const key =
		y +
		String(originalWidth) +
		String(targetWidth) +
		ranges.join(',') +
		weights.join(',');
	if (cache[key]) {
		return cache[key];
	}

	const extraSpace = targetWidth - originalWidth;
	const stretchArea = areaOfRanges(ranges, weights);

	const defaultStretchFactor = extraSpace / stretchArea;

	const result = interpolate(
		y,
		[
			0,
			...ranges.flat(1).map((r) => {
				const stretchAreasBefore = areaOfRanges(
					ranges.filter((_) => _[1] <= r),
					weights
				);
				return r + stretchAreasBefore * defaultStretchFactor;
			}),
			targetWidth,
		],
		[0, ...ranges.flat(1), originalWidth],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);
	cache[key] = result;
	return cache[key];
};

const font = new FontFace(
	'Kanit',
	'url(https://fonts.gstatic.com/s/kanit/v7/nKKU-Go6G5tXcr4uPhWnVaFrNlJz.woff2) format("woff2")'
);
font.load();

export const TextStretchWord: React.FC<{
	fullWidth: number;
	text: string;
	fontSize: number;
	fontFamily: string;
	stretchProgress: number;
	weightForLetter: (letter: LetterCallbackObject) => number;
}> = ({
	fullWidth,
	text,
	fontSize,
	fontFamily,
	stretchProgress,
	weightForLetter,
}) => {
	const ref = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		font
			.load()
			.then(() => {
				if (!document.fonts.has(font)) {
					document.fonts.add(font);
				}
				const dimensions = measureText({
					text,
					fontSize,
					fontFamily,
				});
				const dimensionsForLetter = text.split('').map((letter, i) =>
					measureText({
						fontFamily,
						fontSize,
						text: text.substr(0, i + 1),
					})
				);
				if (!ref.current) {
					throw new Error('Canvas is not mounted');
				}
				ref.current.width = fullWidth;
				ref.current.height = dimensions.boxHeight;
				const context = ref.current?.getContext(
					'2d'
				) as CanvasRenderingContext2D;
				context.clearRect(0, 0, fullWidth, dimensions.boxHeight);
				context.font = `${fontSize}px "${fontFamily}"`;
				context.fillStyle = '#222';
				context.fillText(text, 0, fontSize);
				const imageData = context.getImageData(
					0,
					0,
					// Optimization, get only area needed
					fullWidth,
					dimensions.boxHeight
				).data;
				const stretchRanges = getStretchRanges(
					imageData,
					fullWidth,
					dimensions.boxHeight
				);
				const textWidth = Math.round(
					interpolate(stretchProgress, [0, 1], [dimensions.width, fullWidth], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})
				);

				const newArray = new ImageData(fullWidth, dimensions.boxHeight);

				const getPixelFor = (row: number, column: number, channel: number) => {
					const index = row * fullWidth * 4 + column * 4 + channel;
					return imageData[index];
				};

				for (let column = 0; column < fullWidth; column++) {
					const actualColumn = Math.floor(
						stretchFn(
							column,
							dimensions.width,
							textWidth,
							stretchRanges,
							stretchRanges.map((x, _) => {
								const indexOfLetter = dimensionsForLetter.findIndex(
									(l) => l.width >= x[0] && l.width >= x[1]
								);
								const letter = text[indexOfLetter];
								return weightForLetter({letter, nthLetter: indexOfLetter});
							})
						)
					);
					if (column > textWidth) {
						continue;
					}
					for (
						let currentRow = 0;
						currentRow < dimensions.boxHeight;
						currentRow++
					) {
						const index = currentRow * 4 * fullWidth + column * 4;
						for (let channel = 0; channel < 4; channel++) {
							const pixel = getPixelFor(currentRow, actualColumn, channel);
							newArray.data[index + channel] = pixel;
						}
					}
				}

				context.putImageData(newArray, 0, 0);
			})
			.catch((err) => {
				console.log({err});
			});
	}, [
		fontFamily,
		fontSize,
		fullWidth,
		ref,
		stretchProgress,
		text,
		weightForLetter,
	]);

	return <canvas ref={ref} />;
};
