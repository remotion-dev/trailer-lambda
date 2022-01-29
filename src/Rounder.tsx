import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {getBezierControlPoints} from './Tunnel/point-on-bezier-curve';

const lines = 5;

const focalPoint = [0.5, 0.5];

const strokeWidth = 15;
export const Rounder: React.FC = () => {
	const [x, y] = focalPoint;

	const {height, width} = useVideoConfig();
	const frame = useCurrentFrame();

	const size = Math.sqrt(height ** 2 + width ** 2);

	const toX = interpolate(x, [0, 1], [0, width]);
	const toY = interpolate(y, [0, 1], [0, height]);

	const curvature = interpolate(frame, [0, 50], [Math.PI * 0.6, 0]);
	const scale = interpolate(frame, [0, 50], [1, 5]);
	const radius = interpolate(frame, [0, 50], [0, 200]);

	return (
		<AbsoluteFill
			style={{
				transform: `scale(${scale})`,
			}}
		>
			<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				<circle
					cx={width / 2}
					cy={height / 2}
					r={radius}
					stroke={COLORS[0]}
					strokeWidth={strokeWidth}
					fill="transparent"
				/>

				<defs>
					<mask id="mask">
						<rect
							mask="url(#mask)"
							x={0}
							y={0}
							width={width}
							height={height}
							fill="white"
						/>
						<circle
							cx={width / 2}
							cy={height / 2}
							r={radius}
							strokeWidth={strokeWidth}
						/>
					</mask>
				</defs>
				<rect
					mask="url(#mask)"
					x={0}
					y={0}
					width={width}
					height={height}
					fill="white"
				/>
				<g mask="url(#mask)">
					{new Array(lines).fill(1).map((_, i) => {
						const offset = (i / lines) * Math.PI * 2;
						const startX = Math.sin(offset) * size + toX;
						const startY = Math.cos(offset) * size + toY;

						const arcX = Math.sin(offset + curvature) * size * 0.75 + toX;
						const arcY = Math.cos(offset + curvature) * size * 0.75 + toY;

						const controlPoints1 = getBezierControlPoints(
							[startX, startY],
							[arcX, arcY],
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
								stroke={COLORS[0]}
								strokeWidth={strokeWidth}
							/>
						);
					})}
				</g>
			</svg>
		</AbsoluteFill>
	);
};
