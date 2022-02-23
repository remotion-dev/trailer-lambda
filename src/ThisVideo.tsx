import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from './colors';
import {ensureFiraCode} from './load-font';

const aspectRatio = 16 / 9;
const BAR_HEIGHT = 300;
const BAR_WIDTH = 50;
const STROKE_WIDTH = 12;

ensureFiraCode();

export const ThisVideo: React.FC = () => {
	const frame = useCurrentFrame();
	const {width, height, fps} = useVideoConfig();

	const progress = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});
	const SQUARE_HEIGHT = height * 0.75 * progress;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						height: SQUARE_HEIGHT,
						width: aspectRatio * SQUARE_HEIGHT,
						border: '12px solid' + COLORS[0],
						justifyContent: 'center',
						alignItems: 'center',
						display: 'flex',
						overflow: 'hidden',
					}}
				>
					<h1
						style={{
							color: COLORS[0],
							fontFamily: 'SF Pro',
							fontSize: 200,
							fontWeight: 800,
						}}
					>
						This video
					</h1>
				</div>
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					backgroundColor: 'white',
					height: BAR_WIDTH,
					width: BAR_HEIGHT,
					top:
						height / 2 + SQUARE_HEIGHT / 2 - BAR_WIDTH / 2 - STROKE_WIDTH / 2,
					left: width / 2 - BAR_HEIGHT / 2,
					justifyContent: 'center',
					alignItems: 'center',
					color: COLORS[0],
					fontSize: 50,
					fontFamily: 'Fira',
					transform: `scale(${progress})`,
				}}
			>
				1920px
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					backgroundColor: 'white',
					height: BAR_WIDTH,
					width: BAR_HEIGHT,
					top: height / 2 - BAR_WIDTH / 2 - STROKE_WIDTH / 2,
					left: width / 2 - (SQUARE_HEIGHT / 2) * aspectRatio - BAR_HEIGHT / 2,
					justifyContent: 'center',
					alignItems: 'center',
					color: COLORS[0],
					fontSize: 50,
					fontFamily: 'Fira',
					transform: `rotate(-90deg) scale(${progress})`,
				}}
			>
				1080px
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
