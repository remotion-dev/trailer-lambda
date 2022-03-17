import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from '../colors';
import {BACKGROUND, COLOR, Theme} from './const';
import {Controls} from './Controls';

export const Light: React.FC<{
	theme: Theme;
	width: number | null;
	delay: number;
	flipProgress: number | null;
}> = ({theme, width: originalWidth, delay, flipProgress}) => {
	const frame = useCurrentFrame();
	const {fps, width: compWidth} = useVideoConfig();
	const width = originalWidth ?? compWidth;
	const height = (width / 16) * 9;
	const PADDING = width * 0.05;

	const actualFlipProgress =
		flipProgress ??
		spring({
			fps,
			frame: frame - 50,
			config: {
				damping: 200,
			},
		});

	const progress = spring({
		fps,
		frame: frame - delay,
		config: {
			damping: 200,
		},
	});

	const scale = interpolate(progress, [0, 1], [0.6, 1]);

	const circumference = 2 * (width - PADDING * 2) + 2 * (height - PADDING * 2);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: BACKGROUND(theme),
				perspective: 700,
			}}
		>
			<AbsoluteFill
				style={{
					transform: `scale(${scale}) rotateY(${interpolate(
						actualFlipProgress,
						[0, 1],
						[0, -Math.PI]
					)}rad)`,
					justifyContent: 'center',
					alignItems: 'center',
					backfaceVisibility: 'hidden',
				}}
			>
				<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
					<path
						stroke={COLOR}
						strokeWidth={10}
						fill="none"
						d={`
					M ${PADDING} ${PADDING}
					L ${width - PADDING} ${PADDING}
					L ${width - PADDING} ${height - PADDING}
					L ${PADDING} ${height - PADDING}
					z
					`}
						strokeDasharray={`${circumference} ${circumference}`}
						strokeDashoffset={(1 - progress) * circumference}
					/>
				</svg>
				<Controls
					height={height}
					padding={PADDING}
					delay={delay}
					width={width}
				/>
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					transform: `rotateY(${interpolate(
						actualFlipProgress,
						[0, 1],
						[Math.PI, 0]
					)}rad)`,
					backfaceVisibility: 'hidden',
				}}
			>
				<h1
					style={{
						fontFamily: 'SF Pro',
						fontSize: 80,
						color: COLORS[0],
						marginTop: 0,
						marginBottom: 0,
						fontWeight: 700,
						lineHeight: 1,
						textAlign: 'center',
					}}
				>
					Player
				</h1>
				<h2
					style={{
						fontFamily: 'SF Pro',
						fontSize: 35,
						color: '#444',
						marginTop: 20,
						marginBottom: 0,
						fontWeight: 700,
						lineHeight: 1,
						textAlign: 'center',
					}}
				>
					Interactive videos
				</h2>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
