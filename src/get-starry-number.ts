import {BoundingBox, Font} from 'opentype.js';
import {interpolate, random} from 'remotion';
import {FONT_SIZE} from './math/font-size';

import svgPathProperties = require('svg-path-properties');
const amountOfPoints = 200;

type ViewBox = Pick<BoundingBox, 'x1' | 'x2' | 'y1' | 'y2'>;

const radius = FONT_SIZE;

export const getStarryNumber = (
	char: string,
	font: Font,
	frame: number
): {
	viewBox: ViewBox;
	points: {x: number; y: number; opacity: number}[];
} => {
	if (char === 'react') {
		return {
			points: new Array(amountOfPoints).fill(true).map((_, i) => {
				const radiusWithRandomOffset = radius + (random(`i${i}`) - 0.5) * 40;
				return {
					x:
						radiusWithRandomOffset +
						Math.sin((i / amountOfPoints) * Math.PI * 2 + frame / 10) *
							radiusWithRandomOffset,
					y:
						radiusWithRandomOffset +
						Math.cos((i / amountOfPoints) * Math.PI * 2 + frame / 10) *
							radiusWithRandomOffset *
							interpolate(frame, [60, 120], [0.6, 0.4], {
								extrapolateRight: 'clamp',
							}),
					opacity: random(`opacity-${i}`),
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
		points: new Array(amountOfPoints).fill(true).map((_, i) => ({
			...svgPathProperties
				.svgPathProperties(leftPath)
				.getPointAtLength((i / amountOfPoints) * totalLength),
			opacity: 1,
		})),
		viewBox,
	};
};

const randomness = 250;

export const interpolateStarryNumber = ({
	char1,
	char2,
	font,
	factor,
	frame,
}: {
	char1: string;
	char2: string;
	font: Font;
	factor: number;
	frame: number;
}) => {
	const starr = getStarryNumber(char1, font, frame);
	const starr2 = getStarryNumber(char2, font, frame);

	const points = starr.points.map(
		(p, i): {x: number; y: number; opacity: number} => {
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
				opacity: interpolate(
					factor,
					[0, 1],
					[starr.points[i].opacity, starr2.points[i].opacity]
				),
			};
		}
	);
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
