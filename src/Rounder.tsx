import React from 'react';
import {AbsoluteFill, interpolate, useVideoConfig} from 'remotion';
import {COLORS} from './colors';
import {getBezierControlPoints} from './Tunnel/point-on-bezier-curve';

const lines = 1;

const focalPoint = [0.5, 0.5];

export const Rounder: React.FC = () => {
	const [x, y] = focalPoint;

	const {height, width} = useVideoConfig();

	const size = Math.sqrt(height ** 2 + width ** 2);

	const toX = interpolate(x, [0, 1], [0, width]);
	const toY = interpolate(y, [0, 1], [0, height]);
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				{new Array(lines).fill(1).map((_, i) => {
					const offset = (i / lines) * Math.PI * 2;
					const startX = Math.sin(offset) * size + toX;
					const startY = Math.cos(offset) * size + toY;

					const arcX = Math.sin(offset + 2) * size + toX;
					const arcY = Math.cos(offset + 2) * size + toY;

					const controlPoints1 = getBezierControlPoints(
						[startX, startY],
						[arcX - toX / 2, arcY - toY / 2],
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
						<path fill="none" d={triangle} stroke={COLORS[0]} strokeWidth={5} />
					);
				})}
				<circle
					cx={width / 2}
					cy={height / 2}
					r={200}
					fill="white"
					stroke={COLORS[0]}
					strokeWidth={5}
				/>
			</svg>
		</AbsoluteFill>
	);
};
