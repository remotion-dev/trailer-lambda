import React from 'react';
import {COLORS} from './colors';
import {getViewBoxFromBoundingBox} from './get-viewbox-from-bounding-box';
import {FONT_SIZE} from './math/font-size';

export const OpenTypeNumber: React.FC<{
	font: opentype.Font;
	str: string;
}> = ({font, str}) => {
	const glyph = font.charToGlyph(str);
	const leftSvg = glyph.getPath(undefined, undefined, FONT_SIZE);
	const path = leftSvg.toPathData(3);
	const box = leftSvg.getBoundingBox();

	const height = box.y2 - box.y1;
	const viewBox = getViewBoxFromBoundingBox(box);
	return (
		<svg viewBox={viewBox} style={{height}}>
			<path d={path} fill={COLORS[0]} />
		</svg>
	);
};
