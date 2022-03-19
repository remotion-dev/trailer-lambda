import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {FONT_SIZE} from './math/font-size';

export const InitialBigNum: React.FC = () => {
	const {fps, height} = useVideoConfig();
	const frame = useCurrentFrame();

	const translateY = (delay: number) => {
		const spr = spring({
			fps,
			frame: frame - delay,
			config: {
				damping: 200,
			},
		});

		return interpolate(spr, [0, 1], [height, 0]);
	};

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					fontSize: FONT_SIZE * 0.975,
					color: COLORS[0],
					fontFamily: 'Assistant',
				}}
			>
				<span
					style={{
						display: 'inline-block',
						transform: `translateY(${translateY(0)}px)`,
					}}
				>
					6
				</span>
				<span
					style={{
						display: 'inline-block',
						transform: `translateY(${translateY(2)}px)`,
					}}
				>
					0
				</span>
			</div>
		</AbsoluteFill>
	);
};
