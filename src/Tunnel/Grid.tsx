import React from 'react';
import {AbsoluteFill, interpolate, useVideoConfig} from 'remotion';
import {getBezierControlPoints} from './point-on-bezier-curve';

const lines = 10;

export const Grid: React.FC<{
	focalPoint: readonly [number, number];
}> = ({focalPoint}) => {
	const [x, y] = focalPoint;

	const {height, width} = useVideoConfig();

	const size = Math.sqrt(height ** 2 + width ** 2);

	const toX = interpolate(x, [0, 1], [0, width]);
	const toY = interpolate(y, [0, 1], [0, height]);

	return (
		<AbsoluteFill>
			<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				{new Array(lines).fill(1).map((_, i) => {
					const offset = (i / lines) * Math.PI * 2;
					const startX = Math.sin(offset) * size + toX;
					const startY = Math.cos(offset) * size + toY;

					const controlPoints1 = getBezierControlPoints(
						[startX, startY],
						[toX, toY],
						focalPoint[0],
						width
					);

					console.log('grid', controlPoints1);

					const triangle = `
          M ${startX} ${startY}
          C ${controlPoints1.cp1.join(' ')},
            ${controlPoints1.cp2.join(' ')},
            ${toX} ${toY}
          `;
					return (
						<path
							fill="none"
							d={triangle}
							stroke="rgba(0, 0, 0, 0.1)"
							strokeWidth={1}
						/>
					);
				})}
			</svg>
		</AbsoluteFill>
	);
};
