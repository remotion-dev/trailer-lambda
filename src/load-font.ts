import opentype, {Font} from 'opentype.js';
import {useEffect, useState} from 'react';
import {continueRender, delayRender, staticFile} from 'remotion';

const loadFont = async () => {
	const handle = delayRender();
	const font = await opentype.load(staticFile('Assistant-ExtraBold.ttf'));
	continueRender(handle);
	return font;
};

export const ensureFont = () => {
	if (typeof window !== 'undefined' && 'FontFace' in window) {
		const font = new FontFace(
			'Assistant',
			'url(' + staticFile('/Assistant-ExtraBold.woff') + ") format('woff')"
		);
		const handle = delayRender();
		font.load().then(() => {
			document.fonts.add(font);
			continueRender(handle);
		});
	}
};

export const ensureFiraCode = () => {
	if (typeof window !== 'undefined' && 'FontFace' in window) {
		const font = new FontFace(
			'Fira',
			'url(' + staticFile('/FiraCode-SemiBold.woff') + ") format('woff')"
		);
		const handle = delayRender();
		font.load().then(() => {
			document.fonts.add(font);
			continueRender(handle);
		});
	}
};

const SF_PRO_BOLD = 'SFProBold';
const SF_PRO_HEAVY_ITALIC = 'SFProHeavyItalic';

export const ensureSFProHeavyItalic = () => {
	if (typeof window !== 'undefined' && 'FontFace' in window) {
		const font = new FontFace(
			SF_PRO_HEAVY_ITALIC,
			'url(' + staticFile('/sfpro-heavy-italic.otf') + ') '
		);
		const handle = delayRender();
		font.load().then(() => {
			document.fonts.add(font);
			continueRender(handle);
		});
	}

	return SF_PRO_HEAVY_ITALIC;
};

export const ensureSFProBold = () => {
	if (typeof window !== 'undefined' && 'FontFace' in window) {
		const font = new FontFace(
			SF_PRO_BOLD,
			'url(' + staticFile('/sfpro-bold.otf') + ') '
		);
		const handle = delayRender();
		font.load().then(() => {
			document.fonts.add(font);
			continueRender(handle);
		});
	}

	return SF_PRO_BOLD;
};

let globalFont: Font | null = null;

export const useFont = () => {
	const [font, setFont] = useState<opentype.Font | null>(() => globalFont);

	useEffect(() => {
		if (globalFont) return;
		loadFont().then((f) => {
			globalFont = f;
			return setFont(f);
		});
	}, []);
	return font;
};
