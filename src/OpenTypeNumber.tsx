import React from 'react';
import {COLORS} from './colors';
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
	const viewBox = `${box.x1} ${box.y1} ${box.x2 - box.x1} ${box.y2 - box.y1}`;
	return (
		<svg viewBox={viewBox} style={{height}}>
			<path d={path} fill={COLORS[0]} />
		</svg>
	);
};
