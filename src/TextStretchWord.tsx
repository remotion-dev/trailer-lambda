import React, {RefObject, useEffect} from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';

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

export const TextStretchWord: React.FC<{
	canvas: RefObject<HTMLCanvasElement>;
	textHeight: number;
	fullWidth: number;
	text: string;
	top: number;
	left: number;
	range1: (width: number) => [number, number];
	range2: (width: number) => [number, number];
	alternate: boolean;
	delay: number;
}> = ({
	canvas: ref,
	textHeight,
	fullWidth,
	range1,
	range2,
	text,
	top,
	left,
	alternate,
	delay,
}) => {
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
		// @ts-expect-error not typed
		document.fonts.ready.then(() => {
			const context = ref.current?.getContext('2d') as CanvasRenderingContext2D;
			context.clearRect(left, top, fullWidth, textHeight);
			context.font = '80px "Kanit"';
			context.fillStyle = '#222';
			context.textBaseline = 'top';
			context.imageSmoothingEnabled = false;
			const measuring = context.measureText(text);
			const textWidth = Math.round(
				interpolate(
					(1 - textStretchProgressOut) * textStretchProgressEnter,
					[0, 1],
					[fullWidth, measuring.width],
					{
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					}
				)
			);
			context.fillText(text, left, top);

			const imageData = context.getImageData(
				left,
				top,
				fullWidth,
				textHeight
			).data;

			const newArray = new ImageData(fullWidth, textHeight);

			const getPixelFor = (row: number, column: number, channel: number) => {
				const index = row * fullWidth * 4 + column * 4 + channel;
				return imageData[index];
			};

			for (let i = 0; i < imageData.length; i++) {
				const currentPixel = Math.floor(i / 4);
				const currentRow = Math.floor(currentPixel / fullWidth);
				const currentColumn = currentPixel % fullWidth;
				const currentChannel = i % 4;
				const actualColumn = Math.floor(
					stretchFn(
						currentColumn,
						textWidth,
						fullWidth,
						range1(textWidth),
						range2(textWidth),
						progress
					)
				);
				const pixel = getPixelFor(currentRow, actualColumn, currentChannel);
				newArray.data[i] = pixel;
			}
			context.putImageData(newArray, left, top);
		});
	}, [
		fullWidth,
		left,
		progress,
		range1,
		range2,
		ref,
		text,
		textHeight,
		textStretchProgressEnter,
		textStretchProgressOut,
		top,
	]);

	return null;
};
