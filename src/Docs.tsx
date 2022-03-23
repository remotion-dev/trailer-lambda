import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';

export const Docs: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const scale = spring({
		fps,
		frame: frame - 30,
		config: {
			damping: 200,
		},
	});
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				transform: `translateY(${interpolate(scale, [0, 1], [600, 0])}px)`,
			}}
		>
			<div
				style={{
					fontFamily: 'SF Pro',
					fontSize: '2.5em',
					fontWeight: 'bold',
				}}
			>
				Explore the docs:
			</div>
			<div
				style={{
					fontFamily: 'SF Pro',
					fontSize: '3.5em',
					fontWeight: 'bold',
					color: COLORS[0],
				}}
			>
				remotion.dev/lambda
			</div>
		</AbsoluteFill>
	);
};
