type MeasuringData = {
	boxHeight: number;
	actualHeight: number;
	width: number;
};

const cache: {[key: string]: MeasuringData} = {};

export const measureText = ({
	text,
	fontSize,
	fontFamily,
}: {
	text: string;
	fontSize: number;
	fontFamily: string;
}): MeasuringData => {
	const cacheKey = text;

	if (cache[cacheKey]) {
		return cache[cacheKey];
	}

	const canv = document.createElement('canvas');
	const context = canv.getContext('2d') as CanvasRenderingContext2D;
	context.font = `${fontSize}px "${fontFamily}"`;
	context.textBaseline = 'top';
	const measuring = context.measureText(text);
	canv.remove();

	if (!document.fonts.check(context.font, text)) {
		throw new Error('Cannot render text');
	}

	const data: MeasuringData = {
		boxHeight:
			measuring.fontBoundingBoxDescent + measuring.fontBoundingBoxAscent,
		actualHeight: Math.abs(
			-measuring.actualBoundingBoxDescent + measuring.actualBoundingBoxAscent
		),
		width: measuring.actualBoundingBoxRight - measuring.actualBoundingBoxLeft,
	};

	cache[cacheKey] = data;

	return data;
};
