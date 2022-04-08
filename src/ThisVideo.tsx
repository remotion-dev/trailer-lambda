import React, {useState} from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from './colors';
import {ensureFiraCode, ensureSFProBold} from './load-font';

const aspectRatio = 16 / 9;
const BAR_WIDTH = 50;
const STROKE_WIDTH = 12;

ensureFiraCode();

export const ThisVideo: React.FC<{
	showSpecs: boolean;
	frameNum: number;
}> = ({showSpecs, frameNum}) => {
	const frame = useCurrentFrame();
	const {width, height, fps} = useVideoConfig();
	const [sfPro] = useState(() => ensureSFProBold());

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

	const moveUp = spring({
		fps,
		frame: frame - 60,
		config: {
			damping: 200,
		},
	});

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				zIndex: 1,
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
						border: '12px solid black',
						justifyContent: 'center',
						alignItems: 'center',
						display: 'flex',
						overflow: 'hidden',
						position: 'relative',
						backgroundColor: 'white',
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
						{showSpecs ? (
							<AbsoluteFill
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									transform: `translateY(${
										moveUp * -MAXIMISED_SQUARE_HEIGHT
									}px)`,
								}}
							>
								<h1
									style={{
										color: COLORS[0],
										fontFamily: sfPro,
										fontSize: 200,
										fontWeight: 800,
									}}
								>
									This video
								</h1>
							</AbsoluteFill>
						) : null}
						{showSpecs ? (
							<AbsoluteFill
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									transform: `translateY(${
										(1 - moveUp) * MAXIMISED_SQUARE_HEIGHT
									}px)`,
								}}
							>
								<h1
									style={{
										color: COLORS[0],
										fontFamily: sfPro,
										fontSize: 200,
										fontWeight: 800,
										textAlign: 'center',
									}}
								>
									2400
									<br />
									frames
								</h1>
							</AbsoluteFill>
						) : null}

						<AbsoluteFill>
							<div
								style={{
									color: COLORS[0],
									fontFamily: 'Fira',
									fontSize: 50,
									fontWeight: 800,
									textAlign: 'right',
									marginRight: 30,
									marginTop: 30,
								}}
							>
								{String(frameNum).padStart(4, '0')}
							</div>
						</AbsoluteFill>
					</div>
				</div>
			</AbsoluteFill>
			{showSpecs ? (
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
			) : null}
			{showSpecs ? (
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
			) : null}
		</AbsoluteFill>
	);
};
