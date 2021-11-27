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

export const pointOnBezierCurve = (
	distance: number,
	start: [number, number],
	end: [number, number],
	focalX: number,
	width: number
) => {
	const cp = getBezierControlPoints(start, end, focalX, width);
	const x =
		(1 - distance) * (1 - distance) * start[0] +
		2 * (1 - distance) * distance * cp.cp1[0] +
		distance * distance * cp.cp2[0];

	const y =
		(1 - distance) * (1 - distance) * start[1] +
		2 * (1 - distance) * distance * cp.cp1[1] +
		distance * distance * cp.cp2[1];

	return [x, y];
};
