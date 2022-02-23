import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	interpolateColors,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import SimplexNoise from 'simplex-noise';
import {Circle} from './Circle';
import {Stage} from './Stage';
import {TunnelNumber} from './TunnelNumber';

const noise = new SimplexNoise('tunnel');

const amount = 1000;

const numbersAmount = 10;

export const Tunnel: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();
	const distanceProgressed = interpolate(frame, [0, 6000], [0, 1]);
	const numbersDistanceProgressed = interpolate(frame, [100, 300], [0, 1], {
		extrapolateLeft: 'extend',
	});

	const noiseStart = interpolate(frame, [90, 100], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const noiseX =
		noise.noise2D(0, frame / 80) * 0.12 * noiseStart +
		Math.sin(frame / 20) * 0.1 * noiseStart;
	const noisey = noise.noise2D(frame / 80, 0) * 0.04 * noiseStart;
	const focalPoint = [0.5 + noiseX, noisey + 0.6] as const;
	const offX = interpolate(focalPoint[0], [0, 1], [-width / 1.8, width / 1.8]);
	const offY = interpolate(focalPoint[1], [0, 1], [-height / 2, height / 2]);

	const color1 = interpolateColors(frame, [90, 100], ['#888', '#000']);
	const color2 = interpolateColors(frame, [90, 100], ['#888', '#222']);

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

				return (
					<AbsoluteFill style={{}}>
						<Circle
							focalPoint={focalPoint}
							scale={scale}
							background={idx % 2 ? color1 : color2}
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

				return (
					<AbsoluteFill
						key={num}
						style={{
							transform: `translateX(${offX}px) translateY(${
								offY + Y_DOWNSHIFT
							}px) scale(${scale})`,
						}}
					>
						<TunnelNumber focalPoint={focalPoint} number={String(num + 10)} />
					</AbsoluteFill>
				);
			})}
		</AbsoluteFill>
	);
};
