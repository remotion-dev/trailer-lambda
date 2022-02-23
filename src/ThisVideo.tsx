import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from './colors';
import {ensureFiraCode} from './load-font';

const aspectRatio = 16 / 9;
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
			mass: 3,
		},
	});
	const MAXIMISED_SQUARE_HEIGHT = height * 0.75;
	const SQUARE_HEIGHT = MAXIMISED_SQUARE_HEIGHT * progress;

	const videoProgress = spring({
		fps,
		frame: frame - 10,
		config: {
			damping: 250,
		},
	});

	const BAR_HEIGHT = 300 * videoProgress;

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
						position: 'relative',
					}}
				>
					<div
						style={{
							height: MAXIMISED_SQUARE_HEIGHT,
							width: MAXIMISED_SQUARE_HEIGHT * aspectRatio,
							position: 'absolute',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
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
					fontSize: 50 * videoProgress,
					fontFamily: 'Fira',
					transform: `scale(${videoProgress})`,
					overflow: 'hidden',
				}}
			>
				1920px
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					backgroundColor: 'white',
					height: BAR_WIDTH,
					width: BAR_HEIGHT,
					top: height / 2 - BAR_WIDTH / 2,
					left:
						width / 2 -
						(SQUARE_HEIGHT / 2) * aspectRatio -
						BAR_HEIGHT / 2 +
						STROKE_WIDTH / 2,
					justifyContent: 'center',
					alignItems: 'center',
					color: COLORS[0],
					fontSize: 50 * videoProgress,
					fontFamily: 'Fira',
					transform: `scale(${videoProgress}) rotate(-90deg)`,
					overflow: 'hidden',
				}}
			>
				1080px
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
