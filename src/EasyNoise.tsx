import {transparentize} from 'polished';
import React, {useMemo} from 'react';
import {AbsoluteFill, interpolateColors, useCurrentFrame} from 'remotion';
import SimplexNoise from 'simplex-noise';
import {COLORS} from './colors';

const simplex = new SimplexNoise('simplex');

const POINTS_X = 50;

export const EasyNoise: React.FC<{width: number; height: number}> = ({
	width,
	height,
}) => {
	const frame = useCurrentFrame();

	const pos = [
		[
			width / 2 + Math.sin(frame / 100) * 160,
			height / 2 + Math.cos(frame / 100) * 160,
		],
		[
			width / 2 - Math.sin(frame / 100) * 160,
			height / 2 - Math.cos(frame / 100) * 160,
		],
	];

	const points = useMemo(() => {
		return new Array(POINTS_X)
			.fill(true)
			.map((_, x) => {
				const r = simplex.noise2D(frame / 30, x);
				const xPos = Math.sin((x / POINTS_X + frame / 300) * Math.PI * 2) * 200;
				const yPos = Math.cos((x / POINTS_X + frame / 300) * Math.PI * 2) * 200;
				const xEnd = Math.sin((x / POINTS_X + frame / 300) * Math.PI * 2) * 250;
				const yEnd = Math.cos((x / POINTS_X + frame / 300) * Math.PI * 2) * 250;

				return {r, xPos, yPos, xEnd, yEnd};
			})
			.flat(1);
	}, [frame]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<svg width={width} height={height}>
				{pos.map((p) => {
					return (
						<>
							{points.map(({xPos, yPos, xEnd, yEnd, r}) => {
								return (
									<path
										d={`M ${xPos + p[0]} ${yPos + p[1]} L ${xEnd + p[0]} ${
											yEnd + p[1]
										}`}
										stroke={interpolateColors(
											r,
											[-1, 4],
											[
												transparentize(1, COLORS[0]),
												transparentize(0.5, COLORS[0]),
											]
										)}
										strokeLinecap="round"
										strokeWidth={20}
									/>
								);
							})}
						</>
					);
				})}
			</svg>
		</AbsoluteFill>
	);
};
