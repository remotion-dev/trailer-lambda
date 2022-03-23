import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';

export const Free: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
	const progress = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});

	const scale = interpolate(progress, [0, 1], [1, 0.8]);
	const translateY = interpolate(progress, [0, 1], [0, -180]);
	const secondTranslateY = interpolate(progress, [0, 1], [height, 150]);

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					transform: `scale(${scale}) translateY(${translateY}px)`,
				}}
			>
				<div
					style={{
						border: '20px solid ' + COLORS[0],
						color: COLORS[0],
						display: 'inline-block',
						fontFamily: 'SF Pro',
						fontSize: 300,
						fontWeight: 'bold',
						paddingLeft: 80,
						paddingRight: 80,
						paddingTop: 20,
						paddingBottom: 20,
						borderRadius: 70,
					}}
				>
					Free
				</div>
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					transform: `translateY(${secondTranslateY}px)`,
				}}
			>
				<div
					style={{
						color: 'black',
						display: 'inline-block',
						fontFamily: 'SF Pro',
						fontSize: 120,
						fontWeight: 'bold',
					}}
				>
					for individuals
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
