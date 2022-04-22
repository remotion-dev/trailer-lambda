import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import SimplexNoise from 'simplex-noise';
import {Triangle} from './Arc';

const simplexNoise = new SimplexNoise('simplexnoise');

export const HypeLogo: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const posterized = Math.round(frame / 2) * 2;
	const scale = spring({
		fps,
		frame: posterized,
		config: {
			damping: 200,
			mass: 0.3,
		},
	});
	const scaleDown = -spring({
		fps,
		frame: posterized - 45,
		config: {
			damping: 200,
			mass: 0.3,
		},
	});

	const beat = Math.sin(posterized / 4) * 0.05 - 0.05;

	const randomRotatiom = () => simplexNoise.noise2D(posterized, 0) * 0.0;

	return (
		<AbsoluteFill>
			<AbsoluteFill
				style={{
					transform: `scale(${Math.max(
						0,
						scale + beat
					)}) rotate(${randomRotatiom()}rad)`,
				}}
			>
				<Triangle tear={scaleDown} />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
