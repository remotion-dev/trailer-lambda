import React, {useState} from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {ensureSFProBold} from './load-font';
import {NormallyTakes} from './NormallyTakes';

const num = 4;

export const NormallyTakesMultiplied: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const [sfPro] = useState(() => ensureSFProBold());
	const spread = spring({
		fps,
		frame: frame - 50,
		config: {
			damping: 200,
		},
	});

	const disappear =
		1 -
		interpolate(
			spring({
				fps,
				frame: frame - 120,
				config: {
					mass: 0.4,
				},
			}),
			[0, 0.9],
			[0, 1],
			{
				extrapolateRight: 'clamp',
			}
		);

	return (
		<AbsoluteFill>
			{new Array(num).fill(true).map((t, i) => {
				const offset = interpolate(i, [0, num - 1], [-700, 700]);
				const scale = interpolate(spread, [0, 1], [1, 0.4]);

				return (
					<AbsoluteFill
						style={{
							transform: `translateX(${spread * offset}px) scale(${
								scale * disappear
							})`,
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
							transform: `translateX(${spread * offset}px) scale(${
								scale * disappear
							})`,
						}}
					>
						<h1
							style={{
								fontSize: 100,
								fontFamily: sfPro,
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
