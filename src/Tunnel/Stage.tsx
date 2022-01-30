import React from 'react';
import {AbsoluteFill, interpolate, useVideoConfig} from 'remotion';
import {COLORS} from '../colors';
import {getBezierControlPoints} from './point-on-bezier-curve';

export const Stage: React.FC<{
	focalX: number;
	focalY: number;
}> = ({focalX, focalY}) => {
	const {height, width} = useVideoConfig();
	const centerX = interpolate(focalX, [0, 1], [0, width]);
	const centerY = interpolate(focalY, [0, 1], [0, height]);

	const extend = width / 2;

	const leftX = centerX - extend;
	const leftY = height;

	const rightX = centerX + extend;
	const rightY = height;

	const controlPoints1 = getBezierControlPoints(
		[leftX, leftY],
		[centerX, centerY],
		focalX,
		width
	);

	const controlPoints2 = getBezierControlPoints(
		[centerX, centerY],
		[rightX, rightY],
		focalX,
		width
	);

	const triangle = `
	M ${leftX} ${leftY}
	C ${controlPoints1.cp1.join(' ')},
		${controlPoints1.cp2.join(' ')},
		${centerX} ${centerY}
	C ${controlPoints2.cp1.join(' ')},
		${controlPoints2.cp2.join(' ')},
		${rightX} ${rightY}`;

	return (
		<AbsoluteFill>
			<svg viewBox={`0 0 ${width} ${height}`}>
				<path fill="white" d={triangle} stroke={COLORS[0]} strokeWidth={0} />
			</svg>
		</AbsoluteFill>
	);
};
