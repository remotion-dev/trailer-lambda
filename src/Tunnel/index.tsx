import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import SimplexNoise from 'simplex-noise';
import {pointOnBezierCurve} from './point-on-bezier-curve';
import {Stage} from './Stage';

const noise = new SimplexNoise();

const Circle: React.FC<{
	scale: number;
	distance: number;
	focalPoint: readonly [number, number];
}> = ({scale, distance: distance, focalPoint}) => {
	const {height, width} = useVideoConfig();
	const extend = width / 6;

	const centerX = interpolate(focalPoint[0], [0, 1], [0, width]);
	const centerY = interpolate(focalPoint[1], [0, 1], [0, height]);

	const leftX = interpolate(centerX, [0, width], [0 - extend, width + extend]);
	const leftY = height;

	const point = pointOnBezierCurve(
		distance,
		[centerX, centerY],
		[leftX, leftY],
		focalPoint[0],
		width
	);

	const offX = (point[0] - width / 2) * (1 - distance);
	const offY = (point[0] - height / 2) * (1 - distance);

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					borderRadius: '50%',
					width: height,
					height,
					transform: `translateX(${centerX - width / 2 + offX}px) translateY(${
						centerY - height / 2 + offY
					}px) scale(${scale})`,
					boxShadow: 'inset 0 0 30px white',
				}}
			/>
		</AbsoluteFill>
	);
};

const amount = 15;

export const Tunnel: React.FC = () => {
	const frame = useCurrentFrame();
	const noiseX = noise.noise2D(0, frame / 80) * 0.2;
	const noisey = noise.noise2D(frame / 80, 0) * 0.1;
	const focalPoint = [0.5 + noiseX, noisey + 0.6] as const;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#222',
			}}
		>
			{new Array(amount).fill(true).map((fill, i) => {
				const distance = interpolate(i, [0, amount - 1], [1, 0]);
				const scale = interpolate(distance, [0, 1], [4, 0]);
				return (
					<AbsoluteFill style={{}}>
						<Circle focalPoint={focalPoint} scale={scale} distance={distance} />
					</AbsoluteFill>
				);
			})}
			<Stage focalX={focalPoint[0]} focalY={focalPoint[1]} />
		</AbsoluteFill>
	);
};
