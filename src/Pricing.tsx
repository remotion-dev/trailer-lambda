import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {Free} from './Free';
import {Paid} from './Paid';

const LINE_X_RADIUS = 150;
const LINE_Y_RADIUS = 500;

export const Pricing: React.FC = () => {
	const {fps, width, height} = useVideoConfig();
	const frame = useCurrentFrame();

	const rawProgress = spring({
		fps,
		frame: frame - 45,
		config: {
			damping: 200,
		},
	});

	const progress = rawProgress + frame / 1000 - 0.1;

	const lineProgress = spring({
		fps,
		frame: frame - 50,
		config: {
			damping: 200,
		},
	});

	const x = Math.sin((progress * Math.PI) / 2) * 1000;
	const y = Math.cos((progress * Math.PI) / 2) * 1000;
	const x2 = Math.sin((progress * Math.PI) / 2 + Math.PI) * 1000;
	const y2 = Math.cos((progress * Math.PI) / 2 + Math.PI) * 1000;

	const lineX =
		Math.sin((progress * Math.PI) / 2 + Math.PI / 4) *
			LINE_X_RADIUS *
			lineProgress +
		width / 2;
	const lineY =
		Math.cos((progress * Math.PI) / 2 + Math.PI / 4) *
			LINE_Y_RADIUS *
			lineProgress +
		height / 2;
	const line2X =
		Math.sin((progress * Math.PI) / 2 + Math.PI + Math.PI / 4) *
			LINE_X_RADIUS *
			lineProgress +
		width / 2;
	const line2Y =
		Math.cos((progress * Math.PI) / 2 + Math.PI + Math.PI / 4) *
			LINE_Y_RADIUS *
			lineProgress +
		height / 2;

	return (
		<AbsoluteFill>
			<AbsoluteFill
				style={{
					transform: `scale(${interpolate(
						rawProgress,
						[0, 1],
						[1, 0.5]
					)}) translateX(${interpolate(
						rawProgress,
						[0, 1],
						[0, x2]
					)}px)  translateY(${interpolate(rawProgress, [0, 1], [0, y2])}px)`,
				}}
			>
				<Free />
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					transform: `scale(${Math.max(
						0,
						0.5 * progress
					)}) translateX(${x}px)  translateY(${y}px)`,
				}}
			>
				<Paid start={55} />
			</AbsoluteFill>
			<AbsoluteFill>
				<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
					<path
						d={`M ${lineX} ${lineY} L ${line2X} ${line2Y}`}
						stroke={COLORS[0]}
						strokeWidth={5}
					/>
				</svg>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
