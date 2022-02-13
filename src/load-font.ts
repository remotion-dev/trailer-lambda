import opentype from 'opentype.js';
import {useEffect, useState} from 'react';
import {continueRender, delayRender, staticFile} from 'remotion';

export const loadFont = async () => {
	const handle = delayRender();
	const font = await opentype.load(staticFile('Assistant-ExtraBold.ttf'));
	continueRender(handle);
	return font;
};

export const useFont = () => {
	const [font, setFont] = useState<opentype.Font | null>(null);

	useEffect(() => {
		loadFont().then(setFont);
	}, []);
	return font;
};
