import React from 'react';
import {interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';
import SimplexNoise from 'simplex-noise';
import {COLORS} from '../colors';

const n = new SimplexNoise();
const pos = new SimplexNoise();

export const Stroke: React.FC<{
	seed: number;
	focalPoint: readonly [number, number];
}> = ({seed, focalPoint}) => {
	const frame = useCurrentFrame();
	const {
		width: origWidth,
		height: origHeight,
		durationInFrames,
	} = useVideoConfig();

	const size = Math.sqrt(origWidth * origWidth + origHeight * origHeight);

	const height = size;
	const width = size;
	const centerX = interpolate(focalPoint[0], [0, 1], [0, width]);
	const centerY = interpolate(focalPoint[1], [0, 1], [0, height]);

	const randomValue = n.noise2D(0, seed / 20) * 2 - 1;

	const radius = random(seed + 'i') * 800 + 200;
	const circumference = radius * Math.PI * 2;
	const delay = random(seed) * durationInFrames;

	const enterFrame = frame - delay;

	const offset = interpolate(enterFrame, [0, 25], [0, 800]);
	const translateX = Math.cos(randomValue * Math.PI * 2) * offset;
	const translateY = Math.sin(randomValue * Math.PI * 2) * offset;

	const surroundWidth = 10;
	const point1 = [
		Math.cos(randomValue * Math.PI * 2) * (radius - 150) + centerX,
		Math.sin(randomValue * Math.PI * 2) * (radius - 150) + centerY,
	];
	const point2 = [
		Math.cos(randomValue * Math.PI * 2) * radius + centerX,
		Math.sin(randomValue * Math.PI * 2) * radius + centerY,
	];
	const shift = surroundWidth / circumference;
	const point3 = [
		Math.cos((randomValue + shift) * Math.PI * 2) * radius + centerX,
		Math.sin((randomValue + shift) * Math.PI * 2) * radius + centerY,
	];

	const opacity = 1;

	if (frame < delay) return null;

	return (
		<path
			d={`
  M ${point1.join(' ')}
  L ${point2.join(' ')}
  L ${point3.join(' ')} z
  `}
			style={{
				transform: `translateX(${translateX}px) translateY(${translateY}px)`,
				opacity,
			}}
			fill={COLORS[0]}
		/>
	);
};
