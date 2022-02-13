import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {css} from 'styled-components';
import {Drop} from './Drop';

const radius = 300;
const strokeWidth = 55;
const amountOfMarkers = 35;
const duration = 40;

const innerR = radius - (strokeWidth / 4) * 3;
const innerCircumference = innerR * Math.PI * 2;
const transition = css`
	from {
		stroke-dashoffset: 0;
	}
	to {
		stroke-dashoffset: ${innerCircumference};
	}
`;

export const HugeOrb: React.FC = () => {
	const {width, height, fps} = useVideoConfig();
	const frame = useCurrentFrame();

	return (
		<>
			{new Array(amountOfMarkers)
				.fill(true)
				.map((i, x) => x / amountOfMarkers)
				.map((angle) => {
					return <Drop delay={angle * duration} angle={angle * Math.PI * 2} />;
				})}

			<svg
				width={width}
				height={height}
				viewBox={`0 0 ${width} ${height}`}
				style={{
					transform: `rotate(90deg)`,
				}}
			>
				<circle
					cx={width / 2}
					cy={height / 2}
					r={radius}
					fill="transparent"
					style={{}}
				/>
			</svg>
		</>
	);
};
