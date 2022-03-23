import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';

export const Curtain: React.FC = ({children}) => {
	const {fps, width} = useVideoConfig();
	const frame = useCurrentFrame();
	const progress = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});

	const translateX1 = interpolate(progress, [0, 1], [0, -width / 2]);
	const translateX2 = interpolate(progress, [0, 1], [0, width / 2]);

	return (
		<AbsoluteFill>
			{children}

			<AbsoluteFill
				style={{
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				<div
					style={{
						flex: 1,
						backgroundColor: COLORS[0],
						transform: `translateX(${translateX1}px)`,
					}}
				/>
				<div
					style={{
						flex: 1,
						backgroundColor: COLORS[0],
						transform: `translateX(${translateX2}px)`,
					}}
				/>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
