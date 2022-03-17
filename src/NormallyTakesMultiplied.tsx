import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {NormallyTakes} from './NormallyTakes';

const num = 4;

export const NormallyTakesMultiplied: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
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
				const offset = interpolate(i, [0, num - 1], [-100, 100]);

				const moveOut = spring({
					fps,
					frame: frame - 120 - (num - i * 2),
					config: {
						damping: 200,
					},
				});
				return (
					<AbsoluteFill
						style={{
							transform: `translateX(${spread * -offset}px) translateY(${
								spread * offset + moveOut * height
							}px)`,
						}}
					>
						<NormallyTakes />
					</AbsoluteFill>
				);
			})}
		</AbsoluteFill>
	);
};
