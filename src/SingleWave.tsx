import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {makeSvgWave, svgPathToD} from './make-svg-wave';

export const Wave: React.FC<{
	color: string;
	topOffset: number;
}> = ({color, topOffset}) => {
	const {height, width, fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const progress = spring({
		fps,
		frame,
		config: {
			damping: 200,
			mass: 100,
		},
	});

	const amplitude = interpolate(progress, [0, 1], [0, 100]);
	const radius = interpolate(progress, [0, 1], [0, 7000]);

	const rotation = interpolate(progress, [0, 1], [0, Math.PI * 0.05]);

	const path = makeSvgWave({
		height,
		numberOfCurves: 50,
		amplitude,
		radius,
		width,
		topOffset,
		rotation,
	});
	return (
		<AbsoluteFill>
			<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				<path d={svgPathToD(path)} fill={color} strokeWidth={10} />
			</svg>
		</AbsoluteFill>
	);
};
