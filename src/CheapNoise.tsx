import React, {useMemo} from 'react';
import {AbsoluteFill, random, useCurrentFrame} from 'remotion';
import SimplexNoise from 'simplex-noise';
import {COLORS} from './colors';

const particles = 1000;

const noisex = new SimplexNoise('noisex');
const noisey = new SimplexNoise('noisey');

export const CheapNoise: React.FC<{
	width: number;
	height: number;
}> = ({width, height}) => {
	const frame = useCurrentFrame();

	const points = useMemo(() => {
		return new Array(particles).fill(true).map((p, i) => {
			const x = noisex.noise2D(i, frame / 200) * width;
			const y = noisey.noise2D(i, frame / 200) * height;
			const opacity = random(`op-${i}`) * 0.5;
			const size = random(`size-${i}`) * 100 + 40;
			return {
				x,
				y,
				opacity,
				size,
			};
		});
	}, [height, width, frame]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			{points.map((p) => {
				return (
					<div
						style={{
							position: 'absolute',
							height: p.size,
							width: p.size,
							borderRadius: p.size / 2,
							backgroundColor: 'white',
							left: p.x,
							top: p.y,
							marginLeft: p.size / 2,
							marginTop: p.size / 2,
							border: '10px solid ' + COLORS[0],
							opacity: 0.1,
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};
