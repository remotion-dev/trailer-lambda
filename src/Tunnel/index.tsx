import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	interpolateColors,
	spring,
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
const TOTAL_DISTANCE = 6000;
const ANIMATION_DONE_AFTER = 300;

const DONE_AFTER_DISTANCE = ANIMATION_DONE_AFTER / TOTAL_DISTANCE;

export const Tunnel: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height, fps} = useVideoConfig();
	const distanceProgressed = interpolate(frame, [0, TOTAL_DISTANCE], [0, 1]);
	const numbersDistanceProgressed = interpolate(
		frame,
		[100, ANIMATION_DONE_AFTER],
		[0, 1],
		{
			extrapolateLeft: 'extend',
		}
	);

	const noiseStart = interpolate(frame, [90, 100], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const noiseX =
		noise.noise2D(0, frame / 80) * 0.12 * noiseStart +
		Math.sin(frame / 20) * 0.1 * noiseStart;
	const noiseY = noise.noise2D(frame / 80, 0) * 0.04 * noiseStart;
	const originalFocalPoint = [0.5 + noiseX, 0.7 + noiseY] as const;

	const centerProgress = spring({
		fps,
		frame: frame - ANIMATION_DONE_AFTER + 100,
		config: {
			damping: 200,
			mass: 5,
		},
	});

	const focalPoint = [
		interpolate(centerProgress, [0, 1], [originalFocalPoint[0], 0.5], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}),
		interpolate(centerProgress, [0, 1], [originalFocalPoint[1], 0.5], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}),
	] as const;
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
			{new Array(amount).fill(true).map((_, idx) => {
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

				const fadedColor1 =
					distance > DONE_AFTER_DISTANCE + 0.005 ? '#fff' : color1;
				const fadedColor2 =
					distance > DONE_AFTER_DISTANCE + 0.005 ? '#fff' : color2;

				return (
					<AbsoluteFill>
						<Circle
							focalPoint={focalPoint}
							scale={scale}
							background={idx % 2 ? fadedColor1 : fadedColor2}
						/>
					</AbsoluteFill>
				);
			})}

			<Stage focalX={focalPoint[0]} focalY={focalPoint[1]} />
			{new Array(numbersAmount).fill(true).map((_, num) => {
				const displayNumber = num + 10;

				const isFinalNumber = displayNumber === 10;

				const i = numbersAmount - num - 1;
				const distance = interpolate(i, [0, numbersAmount - 1], [0, 1]);
				const distanceFromTravelled = distance - numbersDistanceProgressed;
				const relativeDistance = interpolate(
					distanceFromTravelled,
					[0, 0.1],
					[0, Math.PI / 2]
				);

				if (relativeDistance < 0 && !isFinalNumber) {
					return null;
				}
				if (relativeDistance > Math.PI / 2) {
					return null;
				}

				const scale = isFinalNumber
					? spring({
							fps,
							frame: frame - ANIMATION_DONE_AFTER + 10,
							config: {
								damping: 200,
							},
					  }) * 3
					: Math.tan(Math.PI / 2 - relativeDistance);

				if (scale < 0) {
					return null;
				}

				return (
					<AbsoluteFill
						key={num}
						style={{
							transform: `translateX(${offX}px) translateY(${offY}px) scale(${scale})`,
						}}
					>
						<TunnelNumber
							scale={scale}
							focalPoint={focalPoint}
							number={String(displayNumber)}
							isFinalNumber={displayNumber === 10}
						/>
					</AbsoluteFill>
				);
			})}
		</AbsoluteFill>
	);
};
