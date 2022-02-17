import React, {useMemo} from 'react';
import {
	AbsoluteFill,
	interpolate,
	random,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const count = 200;

export const SpaceDust: React.FC = () => {
	const frame = useCurrentFrame();
	const {height, width} = useVideoConfig();

	// Generate some random positions, speed factors and timings
	const particles = useMemo(() => {
		const temp = [];
		for (let i = 0; i < count; i++) {
			const time = interpolate(random('time' + i), [0, 1], [0, 100]);
			const factor = interpolate(random('factor' + i), [0, 1], [20, 120]);
			const speed = interpolate(random('speed' + i), [0, 1], [0.01, 0.015]) / 2;
			const starter = interpolate(random('starter' + i), [0, 1], [0, Math.PI]);
			const x = interpolate(random('x' + i), [0, 1], [0, width]);
			const y = interpolate(random('y' + i), [0, 1], [0, height]);

			temp.push({time, factor, speed, x, y, starter});
		}
		return temp;
	}, [height, width]);

	const matrix = useMemo(() => {
		return particles.map((particle) => {
			const {factor, speed, x, y, starter} = particle;

			// Update the particle time
			const t = frame * speed;

			// Derive an oscillating value which will be used
			// for the particle size and rotation
			const s = interpolate(Math.cos((starter + t) * 5), [-1, 1], [0, 1]);

			return {
				rotation: s,
				scale: s,
				position: {
					x:
						x +
						Math.cos((t / 10) * factor) +
						(((Math.sin(t * 1) * factor) / 10) * width) / 100,
					y:
						y +
						Math.sin((t / 10) * factor) +
						(((Math.cos(t * 2) * factor) / 10) * height) / 100,
				},
			};
		});
	}, [frame, particles, width, height]);

	return (
		<AbsoluteFill style={{backgroundColor: 'black'}}>
			{matrix.map((ma) => {
				return (
					<div
						style={{
							position: 'absolute',
							left: ma.position.x,
							top: ma.position.y,
							height: 6,
							width: 6,
							borderRadius: 5,
							transform: `scale(${ma.scale})`,
							backgroundColor: 'white',
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};
