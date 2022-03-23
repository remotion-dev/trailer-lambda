import {transparentize} from 'polished';
import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	measureSpring,
	spring,
	SpringConfig,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {FlatCasette} from './FlatCasette';
import {
	GreekLetter,
	greekLetterOriginalHeight,
	greekLetterOriginalWidth,
} from './Lambda/GreekLetter';

const greekLetterWidth = 36;
const greekLetterHeight =
	(greekLetterWidth / greekLetterOriginalWidth) * greekLetterOriginalHeight;

export const PIECE_HEIGHT = 300;
export const PIECE_WIDTH = 180;
export const BORDER_RADIUS = 8;
export const ROWS = 1;
export const COLUMNS = 6;
export const PIECES = ROWS * COLUMNS;
export const PIECE_RADIUS = 50;

const LAMBDA_PILL_SIZE = 100;

export const TimelineSplitItem: React.FC<{
	index: number;
	goBackTogether: number;
	outRotation: number;
}> = ({index, goBackTogether, outRotation}) => {
	const frame = useCurrentFrame();
	const {fps, height, width} = useVideoConfig();
	const pos = spring({
		fps,
		frame: frame - 20,
		config: {
			damping: 200,
		},
	});
	const interpolatedBorderWidth = interpolate(
		pos,
		[0.7, 1],
		[0, BORDER_RADIUS],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	const joinedLeft =
		width / 2 + index * PIECE_WIDTH - (PIECES / 2) * PIECE_WIDTH;
	const joinedTop = height / 2 - PIECE_HEIGHT / 2;

	const row = Math.floor(index / COLUMNS);

	const column = index % COLUMNS;

	const explodedLeft =
		(width / COLUMNS) * column + (width / COLUMNS - PIECE_WIDTH) / 2;
	const explodedTop =
		(height / ROWS) * row + (height / ROWS - PIECE_HEIGHT) / 2;

	const joinedAgainLeft = width / 2 - 0.5 * PIECE_WIDTH;
	const joinedAgainTop = height / 2 - PIECE_HEIGHT / 2;

	const left = interpolate(
		pos + goBackTogether,
		[0, 1, 1.9],
		[joinedLeft, explodedLeft, joinedAgainLeft],
		{
			extrapolateRight: 'clamp',
		}
	);
	const top = interpolate(
		pos + goBackTogether,
		[0, 1, 1.9],
		[joinedTop, explodedTop, joinedAgainTop],
		{
			extrapolateRight: 'clamp',
		}
	);

	const boxShadowOpacity = interpolate(pos, [0, 1], [0, 0.1]);

	const springConfig: Partial<SpringConfig> = {
		damping: 200,
	};

	const fillAfter = 130 + index * 2;
	const lambdaScaleAfter = 90 + index * 2;

	const lambdaScale = spring({
		fps,
		frame: frame - lambdaScaleAfter,
		config: {},
	});

	const fill = spring({
		fps,
		frame: frame - fillAfter,
		config: springConfig,
	});

	const flipAfter = measureSpring({config: springConfig, fps}) - 2;

	const flip = spring({
		fps,
		frame: frame - flipAfter - fillAfter,
		config: {
			damping: 200,
		},
	});

	return (
		<AbsoluteFill
			style={{
				perspective: 1000,
			}}
		>
			<div
				style={{
					height: PIECE_HEIGHT,
					width: PIECE_WIDTH,
					borderTopWidth: BORDER_RADIUS,
					borderBottomWidth: BORDER_RADIUS,
					borderLeftWidth:
						index === 0 ? BORDER_RADIUS : interpolatedBorderWidth,
					borderRightWidth:
						index === PIECES - 1 ? BORDER_RADIUS : interpolatedBorderWidth,
					borderStyle: 'solid',
					borderColor: COLORS[0],
					borderTopLeftRadius: index === 0 ? PIECE_RADIUS : 0,
					borderBottomLeftRadius: index === 0 ? PIECE_RADIUS : 0,
					borderTopRightRadius: index === PIECES - 1 ? PIECE_RADIUS : 0,
					borderBottomRightRadius: index === PIECES - 1 ? PIECE_RADIUS : 0,
					left,
					top,
					position: 'absolute',
					boxShadow: `0 0 10px rgba(0, 0, 0, ${boxShadowOpacity})`,
					backgroundColor: 'white',
					overflow: 'hidden',
					transform: `rotateY(${interpolate(flip, [0, 1], [0, Math.PI])}rad)`,
					backfaceVisibility: 'hidden',
				}}
			>
				<div
					style={{
						height: '100%',
						width: interpolate(fill, [0, 1], [0, 100]) + '%',
						backgroundColor: COLORS[0],
					}}
				/>
			</div>
			<div
				style={{
					left,
					top,
					position: 'absolute',
					transform: `rotateY(${
						interpolate(flip, [0, 1], [-Math.PI, 0]) + outRotation
					}rad)`,
					backfaceVisibility: 'hidden',
				}}
			>
				<FlatCasette
					style={{
						width: PIECE_WIDTH,
					}}
					label={`chunk${index}.mp4`}
				/>
			</div>
			<div
				style={{
					left: left + PIECE_WIDTH / 2 - LAMBDA_PILL_SIZE / 2,
					top: top + PIECE_HEIGHT / 2 - LAMBDA_PILL_SIZE / 2,
					position: 'absolute',
					width: LAMBDA_PILL_SIZE,
					height: LAMBDA_PILL_SIZE,
					borderRadius: LAMBDA_PILL_SIZE / 2,
					boxShadow: '0 3px 10px ' + transparentize(0.8, COLORS[0]),
					backgroundColor: 'white',
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
					transform: `scale(${lambdaScale - fill})`,
				}}
			>
				<GreekLetter
					alternate
					width={greekLetterWidth}
					height={greekLetterHeight}
					color="black"
				/>
			</div>
		</AbsoluteFill>
	);
};
