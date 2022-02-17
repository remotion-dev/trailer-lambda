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

export const PIECE_HEIGHT = 200;
export const PIECE_WIDTH = 120;
export const BORDER_RADIUS = 8;
export const ROWS = 1;
export const COLUMNS = 6;
export const PIECES = ROWS * COLUMNS;
export const PIECE_RADIUS = 50;

export const TimelineSplitItem: React.FC<{
	index: number;
}> = ({index}) => {
	const frame = useCurrentFrame();
	const {fps, height, width} = useVideoConfig();
	const pos = spring({
		fps,
		frame,
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

	const left = interpolate(pos, [0, 1], [joinedLeft, explodedLeft]);
	const top = interpolate(pos, [0, 1], [joinedTop, explodedTop]);

	const boxShadowOpacity = interpolate(pos, [0, 1], [0, 0.1]);

	const springConfig: Partial<SpringConfig> = {
		damping: 200,
	};

	const fillAfter = 30 + index * 2;

	const fill = spring({
		fps,
		frame: frame - fillAfter,
		config: springConfig,
	});

	const flipAfter = measureSpring({config: springConfig, fps}) - 3;

	const flip = spring({
		fps,
		frame: frame - flipAfter - fillAfter,
		config: {
			damping: 200,
		},
	});

	return (
		<AbsoluteFill>
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
					transform: `rotateY(${interpolate(flip, [0, 1], [Math.PI, 0])}rad)`,
					backfaceVisibility: 'hidden',
				}}
			>
				<FlatCasette
					style={{
						width: PIECE_WIDTH,
					}}
				/>
			</div>
		</AbsoluteFill>
	);
};
