import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	interpolateColors,
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
	background: string;
}> = ({scale, distance, background, focalPoint}) => {
	const {height, width} = useVideoConfig();
	const extend = width / 3;

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
					backgroundColor: background,
					filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.1))',
				}}
			/>
		</AbsoluteFill>
	);
};

const amount = 2000;

export const Tunnel: React.FC = () => {
	const frame = useCurrentFrame();
	const distanceProgressed = interpolate(frame, [0, 14000], [0, 1]);
	const noiseX = noise.noise2D(0, frame / 80) * 0.2;
	const noisey = noise.noise2D(frame / 80, 0) * 0;
	const focalPoint = [0.5 + noiseX, noisey + 0.75] as const;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#222',
			}}
		>
			{new Array(amount).fill(true).map((fill, idx) => {
				const i = amount - idx - 1;
				const distance = interpolate(i, [0, amount - 1], [1, 0]);
				const distanceFromTravelled = distance - distanceProgressed;
				const relativeDistance = interpolate(
					distanceFromTravelled,
					[0, 0.01],
					[0, 1]
				);
				const scale = interpolate(relativeDistance, [0, 1], [8, 0]);

				if (scale < 0) {
					return null;
				}
				if (scale > 10) {
					return null;
				}

				const background = interpolateColors(
					relativeDistance,
					[0, 1],
					['#000', '#222']
				);

				return (
					<AbsoluteFill style={{}}>
						<Circle
							focalPoint={focalPoint}
							scale={scale}
							distance={relativeDistance}
							background={background}
						/>
					</AbsoluteFill>
				);
			})}
			<Stage focalX={focalPoint[0]} focalY={focalPoint[1]} />
		</AbsoluteFill>
	);
};
