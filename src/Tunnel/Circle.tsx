import {interpolate, useVideoConfig} from 'remotion';
export const Circle: React.FC<{
	scale: number;
	focalPoint: readonly [number, number];
	background: string;
}> = ({scale, background, focalPoint}) => {
	const {height, width} = useVideoConfig();

	const centerX = interpolate(focalPoint[0], [0, 1], [0, width]);
	const centerY = interpolate(focalPoint[1], [0, 1], [0, height]);

	return (
		<div
			style={{
				border: '0px solid ' + 'white',
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
