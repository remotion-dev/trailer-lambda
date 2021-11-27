import React from 'react';
import {AbsoluteFill, interpolate, useVideoConfig} from 'remotion';
import {Stage} from './Stage';

const focalPoint = [0.2, 0.5];

const Circle: React.FC<{
	scale: number;
	closeness: number;
}> = ({scale, closeness}) => {
	const {height, width} = useVideoConfig();

	const xPoint = interpolate(closeness, [0, 1], [0.5, focalPoint[0]]);

	const offsetX = interpolate(xPoint, [0, 1], [-width / 2, width / 2]);

	console.log(xPoint);
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					borderRadius: '50%',
					width: height,
					height,
					transformOrigin: '50% 50%',
					transform: ` scale(${scale}) translateX(${offsetX}px)`,
					backgroundColor: '#222',
					boxShadow: 'inset 0 0 30px white',
				}}
			/>
		</AbsoluteFill>
	);
};

const amount = 15;

export const Tunnel: React.FC = () => {
	return (
		<AbsoluteFill>
			{new Array(amount).fill(true).map((fill, i) => {
				const closeness = interpolate(i, [0, amount - 1], [0, 1]);
				const scale = interpolate(closeness, [0, 1], [6, 0]);
				return (
					<AbsoluteFill style={{}}>
						<Circle scale={scale} closeness={closeness} />
					</AbsoluteFill>
				);
			})}
			<Stage />
		</AbsoluteFill>
	);
};
