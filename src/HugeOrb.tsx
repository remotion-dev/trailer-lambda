import React from 'react';
import {useVideoConfig} from 'remotion';
import {Drop} from './Drop';

const radius = 300;
const amountOfMarkers = 35;
const duration = 40;

export const HugeOrb: React.FC = () => {
	const {width, height} = useVideoConfig();

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
