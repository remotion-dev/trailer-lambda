import {interpolate, useVideoConfig} from 'remotion';
import {COLORS} from '../colors';
export const Circle: React.FC<{
	scale: number;
	distance: number;
	focalPoint: readonly [number, number];
	background: string;
}> = ({scale, distance, background, focalPoint}) => {
	const {height, width} = useVideoConfig();

	const centerX = interpolate(focalPoint[0], [0, 1], [0, width]);
	const centerY = interpolate(focalPoint[1], [0, 1], [0, height]);

	return (
		<div
			style={{
				border: '4px solid ' + COLORS[0],
				borderRadius: '50%',
				width: height,
				height,
				transform: `translateX(${centerX - height / 2}px) translateY(${
					centerY - height / 2
				}px) scale(${scale})`,
				backgroundColor: background,
				overflow: 'hidden',
			}}
		/>
	);
};
