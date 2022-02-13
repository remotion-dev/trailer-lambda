import React, {useEffect, useMemo, useState} from 'react';
import {AbsoluteFill, continueRender, delayRender, staticFile} from 'remotion';
import {OpenTypeNumber} from './OpenTypeNumber';
import opentype = require('opentype.js');

const loadFont = async () => {
	const handle = delayRender();
	const font = await opentype.load(staticFile('Assistant-ExtraBold.ttf'));
	continueRender(handle);
	return font;
};

export const BigNum: React.FC<{
	number: string;
}> = ({number}) => {
	const [font, setFont] = useState<opentype.Font | null>(null);

	useEffect(() => {
		loadFont().then(setFont);
	}, []);

	const path = useMemo(() => {
		if (!font) {
			return null;
		}
		const [left, right] = String(number).split('');
		const leftGlyph = font.charToGlyph(left);
		const rightGlyph = font.charToGlyph(right);
		const kerning = font.getKerningValue(leftGlyph, rightGlyph);
		const leftSvg = leftGlyph.getPath(undefined, undefined, 400);
		const rightSvg = rightGlyph.getPath(undefined, undefined, 400);
		const leftPath = leftSvg.toPathData(3);
		const leftBox = leftSvg.getBoundingBox();
		const rightPath = rightSvg.toPathData(3);
		const rightBox = rightSvg.getBoundingBox();

		return {
			leftPath,
			rightPath,
			leftBox,
			rightBox,
		};
	}, [font, number]);

	if (path === null) {
		return null;
	}

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<OpenTypeNumber box={path.leftBox} path={path.leftPath} />
			<OpenTypeNumber box={path.rightBox} path={path.rightPath} />
		</AbsoluteFill>
	);
};
