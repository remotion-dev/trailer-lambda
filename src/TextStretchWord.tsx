import React, {useEffect, useRef} from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {getStretchRanges} from './get-stretch-points';
import {measureText} from './measure-text';

const cache: {[key: string]: number} = {};

const stretchFn = (
	y: number,
	originalWidth: number,
	targetWidth: number,
	stretchRange1: [number, number],
	stretchRange2: [number, number],
	progress: number
) => {
	const key =
		y +
		originalWidth +
		targetWidth +
		stretchRange1[0] +
		stretchRange1[1] +
		stretchRange2[0] +
		String(stretchRange2[1]) +
		String(progress);
	if (cache[key]) {
		return cache[key];
	}
	const extraSpace = targetWidth - originalWidth;
	const stretchWidth1 = stretchRange1[1] - stretchRange1[0];
	const stretchWidth2 = stretchRange2[1] - stretchRange2[0];
	const spaceInbetweenStretch = stretchRange2[0] - stretchRange1[1];
	const stretchedTo1 = extraSpace * progress + stretchWidth1;
	const stretchedTo2 = extraSpace * (1 - progress) + stretchWidth2;

	const result = interpolate(
		y,
		[
			0,
			stretchRange1[0],
			stretchRange1[0] + stretchedTo1,
			stretchRange1[0] + stretchedTo1 + spaceInbetweenStretch,
			stretchRange1[0] + stretchedTo1 + spaceInbetweenStretch + stretchedTo2,
			targetWidth,
		],
		[
			0,
			stretchRange1[0],
			stretchRange1[1],
			stretchRange2[0],
			stretchRange2[1],
			originalWidth,
		]
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
	alternate: boolean;
	delay: number;
	fontSize: number;
	fontFamily: string;
}> = ({fullWidth, text, alternate, delay, fontSize, fontFamily}) => {
	const ref = useRef<HTMLCanvasElement>(null);
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const textStretchProgressEnter = spring({
		fps,
		frame,
		config: {
			damping: 100,
		},
	});
	const textStretchProgressOut = spring({
		fps,
		frame: frame - 60 - delay,
		config: {
			damping: 100,
		},
	});
	const progress = interpolate(
		Math.cos(frame / 8),
		[-1, 1],
		alternate ? [1, 0] : [0, 1]
	);

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
				// for (const range of stretchRanges) {
				// 	context.fillStyle = 'red';
				// 	context.fillRect(
				// 		range[0],
				// 		0,
				// 		range[1] - range[0],
				// 		dimensions.boxHeight
				// 	);
				// }
				const textWidth = Math.round(
					interpolate(
						(1 - textStretchProgressOut) * textStretchProgressEnter,
						[0, 1],
						[fullWidth, dimensions.width],
						{
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}
					)
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
							textWidth,
							fullWidth,
							stretchRanges[0],
							stretchRanges[1],
							progress
						)
					);
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
		progress,
		ref,
		text,
		textStretchProgressEnter,
		textStretchProgressOut,
	]);

	return <canvas ref={ref} />;
};
