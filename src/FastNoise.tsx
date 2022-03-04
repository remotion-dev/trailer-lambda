import {transparentize} from 'polished';
import React, {useMemo} from 'react';
import {
	AbsoluteFill,
	interpolateColors,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import SimplexNoise from 'simplex-noise';
import {COLORS} from './colors';

const simplex = new SimplexNoise('simplex');

const POINTS_X = 50;
const POINTS_Y = 60;

const PADDING = 400;

const X_OFFSET = 50;

export const FastNoise: React.FC = () => {
	const {width, height} = useVideoConfig();
	const frame = useCurrentFrame();

	const points = useMemo(() => {
		return new Array(POINTS_X)
			.fill(true)
			.map((_, x) => {
				return new Array(POINTS_Y).fill(true).map((_, y) => {
					const r = simplex.noise3D(frame / 30, x, y);
					const baseX = (x / POINTS_X) * (width + PADDING) + X_OFFSET;
					const baseY = (y / POINTS_Y) * (height * 2 + PADDING) - PADDING / 2;

					return {r, baseX, baseY};
				});
			})
			.flat(1);
	}, [frame, height, width]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<svg width={width} height={height}>
				{points.map(({baseX, baseY, r}) => {
					const x = baseX - frame * 10;
					const y = baseY;
					return (
						<path
							d={`M ${x + X_OFFSET} ${y} L ${x} ${y}`}
							stroke={interpolateColors(
								r,
								[-1, 4],
								[transparentize(1, COLORS[0]), transparentize(0.5, COLORS[0])]
							)}
							strokeLinecap="round"
							strokeWidth={30}
						/>
					);
				})}
			</svg>
		</AbsoluteFill>
	);
};