import React, {useMemo} from 'react';
import {AbsoluteFill} from 'remotion';
import {useFont} from './load-font';
import {FONT_SIZE} from './math/font-size';
import {OpenTypeNumber} from './OpenTypeNumber';

export const BigNum: React.FC<{
	number: string;
}> = ({number}) => {
	const font = useFont();

	const path = useMemo(() => {
		if (!font) {
			return null;
		}
		const [leftGlyph, rightGlyph] = font.stringToGlyphs(String(number));
		const kerning = font.getKerningValue(leftGlyph, rightGlyph);
		const leftSvg = leftGlyph.getPath(undefined, undefined, FONT_SIZE);
		const rightSvg = rightGlyph.getPath(undefined, undefined, FONT_SIZE);
		const leftPath = leftSvg.toPathData(3);
		const leftBox = leftSvg.getBoundingBox();
		const rightPath = rightSvg.toPathData(3);
		const rightBox = rightSvg.getBoundingBox();

		return {
			leftPath,
			rightPath,
			leftBox,
			rightBox,
			kerning,
		};
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
			<div style={{display: 'flex', flexDirection: 'row'}}>
				<OpenTypeNumber font={font} str={number[0]} />
				<div style={{width: 15}} />
				<OpenTypeNumber font={font} str={number[1]} />
			</div>
		</AbsoluteFill>
	);
};
