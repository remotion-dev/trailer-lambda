import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	interpolateColors,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {
	COLOR,
	CONTROLS_START,
	FOREGROUND,
	PADDING,
	PLAY_START,
	Theme,
} from './const';

export const TimeBar: React.FC<{
	theme: Theme;
}> = ({theme}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const prog = spring({
		fps,
		frame: frame - CONTROLS_START - 3,
		config: {
			damping: 200,
		},
	});
	const color = interpolateColors(
		frame,
		[CONTROLS_START + 30, CONTROLS_START + 35],
		[COLOR, FOREGROUND(theme)]
	);
	const currentTime = Math.max(0, frame - PLAY_START) / fps;

	return (
		<AbsoluteFill
			style={{
				top: 'auto',
				right: 'auto',
				left: PADDING,
				bottom: PADDING,
				overflow: 'hidden',
				justifyContent: 'flex-end',
			}}
		>
			<div
				style={{
					height: 10,
					width: 1280 - PADDING * 2 - 40 * 2,
					left: 40,
					bottom: 30,
					position: 'absolute',
					borderRadius: 10,
					backgroundColor: interpolateColors(
						0.5,
						[0, 1],
						['rgba(255, 255, 255, 0)', color]
					),
					transform: `translateY(${interpolate(prog, [0, 1], [200, 0])}px)`,
				}}
			>
				<div
					style={{
						position: 'absolute',
						width: Math.max(1, (currentTime / 45) * 100) + '%',
						height: '100%',
						backgroundColor: color,
						borderRadius: 10,
					}}
				/>
			</div>
		</AbsoluteFill>
	);
};
