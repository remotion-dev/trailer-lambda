import {BoundingBox, Font} from 'opentype.js';
import {interpolate, random} from 'remotion';
import {Point} from 'svg-path-properties/dist/types/types';
import {FONT_SIZE} from './math/font-size';

import svgPathProperties = require('svg-path-properties');
const amountOfPoints = 200;

type ViewBox = Pick<BoundingBox, 'x1' | 'x2' | 'y1' | 'y2'>;

const radius = FONT_SIZE;
export const getStarryNumber = (
	char: string,
	font: Font
): {
	viewBox: ViewBox;
	points: Point[];
} => {
	if (char === 'react') {
		return {
			points: new Array(amountOfPoints).fill(true).map((_, i) => {
				return {
					x: radius + Math.sin((i / amountOfPoints) * Math.PI * 2) * radius,
					y:
						radius +
						Math.cos((i / amountOfPoints) * Math.PI * 2) * radius * 0.4,
				};
			}),
			viewBox: {
				x1: 0,
				x2: radius * 2,
				y1: 0,
				y2: radius * 2,
			},
		};
	}
	const svg = font.getPath(char, 0, 0, FONT_SIZE);
	const leftPath = svg.toPathData(3);
	const viewBox = svg.getBoundingBox();

	const totalLength = svgPathProperties
		.svgPathProperties(leftPath)
		.getTotalLength();

	return {
		points: new Array(amountOfPoints)
			.fill(true)
			.map((_, i) =>
				svgPathProperties
					.svgPathProperties(leftPath)
					.getPointAtLength((i / amountOfPoints) * totalLength)
			),
		viewBox,
	};
};

const randomness = 250;

export const interpolateStarryNumber = (
	char1: string,
	char2: string,
	font: Font,
	factor: number
) => {
	const starr = getStarryNumber(char1, font);
	const starr2 = getStarryNumber(char2, font);

	const points = starr.points.map((p, i): {x: number; y: number} => {
		const indexToInterpolateTo = (i + amountOfPoints / 2) % amountOfPoints;
		const randomXOffset = interpolate(
			factor,
			[0, 0.5, 1],
			[0, randomness * random('factorx' + i) - randomness / 2, 0]
		);
		const randomYOffset = interpolate(
			factor,
			[0, 0.5, 1],
			[0, randomness * random('factory' + i) - randomness / 2, 0]
		);
		return {
			x:
				interpolate(
					factor,
					[0, 1],
					[starr.points[i].x, starr2.points[indexToInterpolateTo].x]
				) + randomXOffset,
			y:
				interpolate(
					factor,
					[0, 1],
					[starr.points[i].y, starr2.points[indexToInterpolateTo].y]
				) + randomYOffset,
		};
	});
	const interpolatedViewBox: Pick<BoundingBox, 'x1' | 'x2' | 'y1' | 'y2'> = {
		x1: interpolate(factor, [0, 1], [starr.viewBox.x1, starr2.viewBox.x1]),
		x2: interpolate(factor, [0, 1], [starr.viewBox.x2, starr2.viewBox.x2]),
		y1: interpolate(factor, [0, 1], [starr.viewBox.y1, starr2.viewBox.y1]),
		y2: interpolate(factor, [0, 1], [starr.viewBox.y2, starr2.viewBox.y2]),
	};

	return {
		points,
		viewBox: interpolatedViewBox,
	};
};
