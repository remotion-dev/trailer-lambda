import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	interpolateColors,
	random,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const vertical = 4;
const horizontal = 50;

const Column: React.FC<{
	column: number;
	defaultShade: number;
}> = ({column, defaultShade}) => {
	const frame = useCurrentFrame();
	const addedCounter = Math.round(frame);
	const {width, height} = useVideoConfig();
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				flex: 1,
			}}
		>
			{new Array(vertical).fill(true).map((_, i) => {
				const shade =
					defaultShade + random(`${i - addedCounter}${column}`) * 0.02;
				const color = interpolateColors(shade, [0, 1], ['#fff', '#000']);
				return (
					<div
						style={{
							width: width / horizontal,
							height: height / vertical,
							backgroundColor: color,
						}}
					/>
				);
			})}
		</div>
	);
};

export const Upwind: React.FC = () => {
	const frame = useCurrentFrame();
	const shade = interpolate(frame, [0, 120], [0, 1]);
	const color = interpolateColors(shade, [0, 1], ['#fff', '#000']);

	return (
		<AbsoluteFill
			style={{
				flexDirection: 'row',
				backgroundColor: color,
			}}
		>
			{new Array(horizontal).fill(true).map((_, i) => {
				return <Column defaultShade={shade} column={i} />;
			})}
		</AbsoluteFill>
	);
};
