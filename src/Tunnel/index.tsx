import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	interpolateColors,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import SimplexNoise from 'simplex-noise';
import {ThreeDText} from '../3DText/3DText';
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
					boxShadow: '0 0 40px ' + 'rgba(255, 255, 255, 0.5)',
				}}
			/>
		</AbsoluteFill>
	);
};

const amount = 1000;

const numbersAmount = 13;

export const Tunnel: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();
	const distanceProgressed = interpolate(frame, [0, 7000], [0, 1]);
	const numbersDistanceProgressed = interpolate(frame, [0, 600], [0, 1]);
	const noiseX = noise.noise2D(0, frame / 80) * 0.2;
	const noisey = noise.noise2D(frame / 80, 0) * 0.1;
	const focalPoint = [0.5 + noiseX, noisey + 0.6] as const;
	const offX = interpolate(focalPoint[0], [0, 1], [-width / 1.8, width / 1.8]);
	const offY = interpolate(focalPoint[1], [0, 1], [-height / 2, height / 2]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#fff',
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
				const scale = interpolate(relativeDistance, [0, 0.2, 0.8], [8, 4, 0]);

				if (scale < 0) {
					return null;
				}
				if (scale > 10) {
					return null;
				}

				const background = interpolateColors(
					relativeDistance,
					[0.8, 1],
					['#111', '#333']
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
			{new Array(numbersAmount).fill(true).map((_, num) => {
				const i = numbersAmount - num - 1;
				const distance = interpolate(i, [0, numbersAmount - 1], [0, 1]);
				const distanceFromTravelled = distance - numbersDistanceProgressed;
				const relativeDistance = interpolate(
					distanceFromTravelled,
					[0, 0.1],
					[0, Math.PI / 2]
				);

				if (relativeDistance < 0) {
					return null;
				}
				if (relativeDistance > Math.PI / 2) {
					return null;
				}

				const scale = Math.tan(Math.PI / 2 - relativeDistance);

				if (scale < 0) {
					return null;
				}

				const animProgress = interpolate(
					relativeDistance,
					[0, Math.PI / 2],
					[0, 1]
				);

				const Y_DOWNSHIFT = interpolate(animProgress, [0, 1], [0, 0]);

				const uprightRotation = interpolate(animProgress, [0.2, 1], [0, -0.3]);

				return (
					<AbsoluteFill
						key={num}
						style={{
							transform: `translateX(${offX}px) translateY(${
								offY + Y_DOWNSHIFT
							}px)`,
						}}
					>
						<ThreeDText
							uprightRotation={uprightRotation}
							sideRotation={interpolate(
								focalPoint[0],
								[0, 1],
								[Math.PI / 20, -Math.PI / 20]
							)}
							scale={scale}
							num={130 - i * 10}
						/>
					</AbsoluteFill>
				);
			})}
		</AbsoluteFill>
	);
};
