import {interpolate} from 'remotion';

type BezierPoints = {
	cp1: [number, number];
	cp2: [number, number];
};

export const getBezierControlPoints = (
	start: [number, number],
	end: [number, number],
	focalX: number,
	width: number
): BezierPoints => {
	const bezierPointOffset = interpolate(focalX, [0, 1], [-width, width]) / 4;
	return {
		cp1: [start[0] + bezierPointOffset, start[1]],
		cp2: [end[0] + bezierPointOffset, end[1]],
	};
};
