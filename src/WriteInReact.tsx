import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {AnimatedReactLogo} from './AnimatedReactLogo';
import {COLORS} from './colors';
import {Cursor} from './Cursor';

export const WriteInReact: React.FC<{
	width: number;
	flipProgress: number | null;
}> = ({width: originalWidth, flipProgress}) => {
	const {fps, width: compWidth} = useVideoConfig();
	const frame = useCurrentFrame();
	const actualFlipProgress =
		flipProgress ??
		spring({
			fps,
			frame: frame - 50,
			config: {
				damping: 200,
			},
		});
	const width = originalWidth ?? compWidth;
	const driver = spring({
		fps,
		frame,
		config: {
			damping: 200,
			mass: 2,
		},
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
				width,
				perspective: 700,
			}}
		>
			<AbsoluteFill
				style={{
					transform: `rotateY(${interpolate(
						actualFlipProgress,
						[0, 1],
						[0, -Math.PI]
					)}rad)`,
					backfaceVisibility: 'hidden',
				}}
			>
				<AbsoluteFill
					style={{
						transform: `scale(0.75) translateY(-${width * 0.1}px)`,
					}}
				>
					<AnimatedReactLogo driver={driver} width={width} fill={COLORS[0]} />
				</AbsoluteFill>
				<AbsoluteFill
					style={{
						transform: `scale(0.5) translateY(1000px)`,
						backfaceVisibility: 'hidden',
					}}
				>
					<Cursor width={width} driver={driver} />
				</AbsoluteFill>
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
					Remotion
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
					Write videos in React
				</h2>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
