import React, {useEffect, useRef} from 'react';
import {interpolateColors, useCurrentFrame, useVideoConfig} from 'remotion';
import SimplexNoise from 'simplex-noise';

const simplex = new SimplexNoise('simplex');

const POINTS_X = 50;
const POINTS_Y = 30;

const PADDING = 400;

const Y_OFFSET = 100;
const X_OFFSET = 50;

export const BackgroundNoise: React.FC = () => {
	const canvas = useRef<HTMLCanvasElement>(null);
	const {width, height} = useVideoConfig();
	const frame = useCurrentFrame();

	useEffect(() => {
		const context = canvas.current?.getContext('2d');
		if (!context) {
			return;
		}
		context.clearRect(0, 0, width, height);
		for (let x = 0; x < POINTS_X; x++) {
			for (let y = 0; y < POINTS_Y; y++) {
				const r = simplex.noise3D(frame / 30, x, y);
				const baseX = (x / POINTS_X) * (width + PADDING) - frame;
				const baseY =
					(y / POINTS_Y) * (height + X_OFFSET + PADDING) - PADDING / 2 + frame;
				context.beginPath();
				context.moveTo(baseX - Y_OFFSET, baseY);
				context.lineTo(baseX, baseY - X_OFFSET);
				context.lineWidth = 30;
				context.lineCap = 'round';
				context.strokeStyle = `${interpolateColors(
					r,
					[-1, 4],
					['white', interpolateColors(x, [0, POINTS_X], ['#4290f5', 'orange'])]
				)}`;
				context.stroke();
			}
		}
	}, [frame, height, width]);

	return (
		<div>
			<canvas
				ref={canvas}
				width={width}
				height={height}
				style={{width, height, backgroundColor: 'whitesmoke'}}
			/>
		</div>
	);
};
