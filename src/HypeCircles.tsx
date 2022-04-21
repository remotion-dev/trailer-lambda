import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from './colors';

export const HypeCircles: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const posterized = Math.round(frame / 2) * 2;
	const scale = (delay: number) =>
		spring({
			fps,
			frame: posterized - delay,
			config: {
				damping: 200,
				mass: 1,
			},
		}) * 1.5;
	return (
		<AbsoluteFill
			style={{
				backgroundColor: '#2e2e2e',
			}}
		>
			<AbsoluteFill
				style={{
					backgroundColor: COLORS[0],
					borderRadius: '50%',
					transform: `scale(${scale(0)})`,
				}}
			/>
			<AbsoluteFill
				style={{
					backgroundColor: '#2e2e2e',
					borderRadius: '50%',
					transform: `scale(${scale(14)})`,
				}}
			/>
		</AbsoluteFill>
	);
};
