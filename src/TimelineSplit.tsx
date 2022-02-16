import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';

const PIECE_HEIGHT = 200;
const PIECE_WIDTH = 120;
const PIECE_RADIUS = 50;
const BORDER_RADIUS = 8;
const ROWS = 1;
const COLUMNS = 6;
const PIECES = ROWS * COLUMNS;

export const TimelineSplit: React.FC = () => {
	const {height, width, fps} = useVideoConfig();
	const frame = useCurrentFrame();

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				{new Array(PIECES).fill(true).map((_, i) => {
					const joinedLeft =
						width / 2 + i * PIECE_WIDTH - (PIECES / 2) * PIECE_WIDTH;
					const joinedTop = height / 2 - PIECE_HEIGHT / 2;

					const row = Math.floor(i / COLUMNS);

					const column = i % COLUMNS;
					const explodedLeft =
						(width / COLUMNS) * column + (width / COLUMNS - PIECE_WIDTH) / 2;
					const explodedTop =
						(height / ROWS) * row + (height / ROWS - PIECE_HEIGHT) / 2;
					const pos = spring({
						fps,
						frame,
						config: {
							damping: 200,
						},
					});
					const boxShadowOpacity = interpolate(pos, [0, 1], [0, 0.1]);

					const left = interpolate(pos, [0, 1], [joinedLeft, explodedLeft]);
					const top = interpolate(pos, [0, 1], [joinedTop, explodedTop]);

					const interpolatedBorderWidth = interpolate(
						pos,
						[0.7, 1],
						[0, BORDER_RADIUS],
						{
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}
					);

					const fill = spring({
						fps,
						frame: frame - 30 - i * 2,
						config: {
							damping: 200,
						},
					});

					return (
						<div
							style={{
								height: PIECE_HEIGHT,
								width: PIECE_WIDTH,
								borderTopWidth: BORDER_RADIUS,
								borderBottomWidth: BORDER_RADIUS,
								borderLeftWidth:
									i === 0 ? BORDER_RADIUS : interpolatedBorderWidth,
								borderRightWidth:
									i === PIECES - 1 ? BORDER_RADIUS : interpolatedBorderWidth,
								borderStyle: 'solid',
								borderColor: COLORS[0],
								borderTopLeftRadius: i === 0 ? PIECE_RADIUS : 0,
								borderBottomLeftRadius: i === 0 ? PIECE_RADIUS : 0,
								borderTopRightRadius: i === PIECES - 1 ? PIECE_RADIUS : 0,
								borderBottomRightRadius: i === PIECES - 1 ? PIECE_RADIUS : 0,
								left,
								top,
								position: 'absolute',
								boxShadow: `0 0 10px rgba(0, 0, 0, ${boxShadowOpacity})`,
								backgroundColor: 'white',
								overflow: 'hidden',
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
					);
				})}
			</div>
		</AbsoluteFill>
	);
};
