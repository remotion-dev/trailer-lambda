import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {NormallyTakes} from './NormallyTakes';

const num = 4;

export const NormallyTakesMultiplied: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const spread = spring({
		fps,
		frame: frame - 50,
		config: {
			damping: 200,
		},
	});

	return (
		<AbsoluteFill>
			{new Array(num).fill(true).map((t, i) => {
				const offset = interpolate(i, [0, num - 1], [-700, 700]);
				const scale = interpolate(spread, [0, 1], [1, 0.4]);

				return (
					<AbsoluteFill
						style={{
							transform: `translateX(${spread * offset}px) scale(${scale})`,
						}}
					>
						<NormallyTakes />
					</AbsoluteFill>
				);
			})}
			{new Array(num - 1).fill(true).map((t, i) => {
				const offset = interpolate(i, [0, num - 2], [-470, 470]);
				const scale = interpolate(spread, [0.8, 1], [0, 1], {
					extrapolateLeft: 'clamp',
				});

				return (
					<AbsoluteFill
						style={{
							justifyContent: 'center',
							alignItems: 'center',
							transform: `translateX(${spread * offset}px) scale(${scale})`,
						}}
					>
						<h1
							style={{
								fontSize: 100,
								fontFamily: 'SF Pro',
								color: COLORS[0],
							}}
						>
							+
						</h1>
					</AbsoluteFill>
				);
			})}
		</AbsoluteFill>
	);
};
