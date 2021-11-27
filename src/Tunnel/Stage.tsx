import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';

export const Stage: React.FC = () => {
	const {height, width} = useVideoConfig();
	const centerX = width / 2;
	const centerY = height / 2;

	const extend = width / 6;

	const leftX = centerX - extend;
	const leftY = height;

	const rightX = centerX + extend;
	const rightY = height;

	const triangle = `M ${centerX} ${centerY} L ${leftX} ${leftY} L ${rightX} ${rightY} z`;

	return (
		<AbsoluteFill>
			<svg viewBox={`0 0 ${width} ${height}`}>
				<path d={triangle} fill="white" />
			</svg>
		</AbsoluteFill>
	);
};
