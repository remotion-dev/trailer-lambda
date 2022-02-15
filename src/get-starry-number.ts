import {BoundingBox, Font} from 'opentype.js';
import {interpolate, random} from 'remotion';
import {FONT_SIZE} from './math/font-size';

import svgPathProperties = require('svg-path-properties');
const amountOfPoints = 100;

export const getStarryNumber = (char: string, font: Font) => {
	const glyphs = font.stringToGlyphs(char);
	return glyphs.map((glyph) => {
		const svg = glyph.getPath(undefined, undefined, FONT_SIZE);
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
	});
};

const randomness = 250;

export const interpolateStarryNumber = (
	char1: string,
	char2: string,
	font: Font,
	factor: number
) => {
	const starrs = getStarryNumber(char1, font);
	const starrs2 = getStarryNumber(char2, font);

	return starrs.map((starr, charIndex) => {
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
						[
							starr.points[i].x,
							starrs2[charIndex].points[indexToInterpolateTo].x,
						]
					) + randomXOffset,
				y:
					interpolate(
						factor,
						[0, 1],
						[
							starr.points[i].y,
							starrs2[charIndex].points[indexToInterpolateTo].y,
						]
					) + randomYOffset,
			};
		});

		const interpolatedViewBox: Pick<BoundingBox, 'x1' | 'x2' | 'y1' | 'y2'> = {
			x1: interpolate(factor, [0, 1], [starr.viewBox.x1, starr.viewBox.x1]),
			x2: interpolate(factor, [0, 1], [starr.viewBox.x2, starr.viewBox.x2]),
			y1: interpolate(factor, [0, 1], [starr.viewBox.y1, starr.viewBox.y1]),
			y2: interpolate(factor, [0, 1], [starr.viewBox.y2, starr.viewBox.y2]),
		};

		return {
			points,
			viewBox: interpolatedViewBox,
		};
	});
};
