import React, {useMemo} from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from './colors';
import {useFont} from './load-font';
import {FONT_SIZE} from './math/font-size';

export const BigNum: React.FC<{
	number: string;
}> = ({number}) => {
	const font = useFont();

	const path = useMemo(() => {
		if (!font) {
			return null;
		}
		const glyphs = font.stringToGlyphs(String(number));
		return glyphs.map((glyph) => {
			const leftSvg = glyph.getPath(undefined, undefined, FONT_SIZE);
			const leftBox = leftSvg.getBoundingBox();
			const leftPath = leftSvg.toPathData(3);
			return {leftSvg, leftBox, leftPath};
		});
	}, [font, number]);

	if (path === null || font === null) {
		return null;
	}

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					fontSize: FONT_SIZE * 0.975,
					color: COLORS[0],
					fontFamily: 'Assistant',
				}}
			>
				{String(number)}
			</div>
		</AbsoluteFill>
	);
};
