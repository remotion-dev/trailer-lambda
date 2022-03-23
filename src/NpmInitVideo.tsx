import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';

export const IsOpenSource: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const scale = spring({
		fps,
		frame: frame - 50,
		config: {
			damping: 200,
		},
	});

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				transform: `translateY(${interpolate(scale, [0, 1], [300, 0])}px)`,
			}}
		>
			<div
				style={{
					fontFamily: 'SF Pro',
					fontSize: '2.5em',
					fontWeight: 'bold',
				}}
			>
				This video is on GitHub:
			</div>
			<div
				style={{
					fontFamily: 'SF Pro',
					fontSize: '3.5em',
					fontWeight: 'bold',
					color: COLORS[0],
				}}
			>
				remotion-dev/trailer-lambda
			</div>
		</AbsoluteFill>
	);
};
