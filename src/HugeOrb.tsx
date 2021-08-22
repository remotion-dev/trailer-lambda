import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
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

	const spr = spring({
		fps,
		frame,
		config: {
			damping: 400,
			mass: 12,
		},
	});

	const progress = interpolate(spr, [0, 1], [innerCircumference, 0], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

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
				<defs>
					<linearGradient id="lg">
						<stop stopColor="#4290f5" offset="0" />
						<stop stopColor="#42e9f5" offset="1" />
					</linearGradient>
				</defs>
				<circle
					cx={width / 2}
					cy={height / 2}
					r={radius}
					fill="white"
					style={{
						filter: `drop-shadow(0 0 5px rgba(0, 0, 0, 0.1))`,
					}}
				/>
				<circle
					stroke="url(#lg)"
					strokeWidth={strokeWidth}
					r={innerR}
					fill="none"
					style={{
						backgroundColor: 'yellow',
						animation: `${transition} 3s`,
					}}
					strokeLinecap="round"
					strokeDasharray={`${innerCircumference}`}
					cx={width / 2}
					cy={height / 2}
				/>
			</svg>
		</>
	);
};
