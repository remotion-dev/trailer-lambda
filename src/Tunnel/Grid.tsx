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

	const extend = 0;

	return (
		<AbsoluteFill>
			<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				{new Array(lines).fill(1).map((_, i) => {
					const offset = (i / lines) * Math.PI * 2;
					const startX = Math.sin(offset) * size + toX;
					const startY = Math.cos(offset) * size + toY;
					const leftX = toX - extend;
					const leftY = toY - extend;

					const controlPoints1 = getBezierControlPoints(
						[leftX, leftY],
						[toX, toY],
						focalPoint[0],
						width
					);

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
							stroke="rgba(255, 255, 255, 0.1)"
							strokeWidth={1}
						/>
					);
				})}
			</svg>
		</AbsoluteFill>
	);
};
