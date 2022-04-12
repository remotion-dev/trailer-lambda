export const getStretchRanges = (
	data: Uint8ClampedArray,
	width: number,
	height: number
): [number, number][] => {
	const isSameAsPreviousRow = new Array(width).fill(true);
	isSameAsPreviousRow[0] = false;

	for (let column = 1; column < width; column++) {
		if (!isSameAsPreviousRow[column]) {
			continue;
		}

		let opaquePixels = 0;
		for (let row = 0; row < height; row++) {
			if (!isSameAsPreviousRow[column]) {
				continue;
			}

			const prevR = data[row * width * 4 + (column - 1) * 4];
			const prevG = data[row * width * 4 + (column - 1) * 4 + 1];
			const prevB = data[row * width * 4 + (column - 1) * 4 + 2];
			const prevA = data[row * width * 4 + (column - 1) * 4 + 3];

			const r = data[row * width * 4 + column * 4];
			const g = data[row * width * 4 + column * 4 + 1];
			const b = data[row * width * 4 + column * 4 + 2];
			const a = data[row * width * 4 + column * 4 + 3];

			if (a > 0) {
				opaquePixels++;
			}

			const isTheSame =
				r === prevR && g === prevG && b === prevB && a === prevA;

			if (!isTheSame) {
				isSameAsPreviousRow[column] = false;
			}
		}

		if (opaquePixels === 0) {
			isSameAsPreviousRow[column] = false;
		}

		if (opaquePixels > height * 0.4) {
			isSameAsPreviousRow[column] = false;
		}
	}

	const ranges: [number, number][] = [];

	let start = null;
	for (let i = 0; i < width; i++) {
		if (isSameAsPreviousRow[i] && !start) {
			start = i;
		}

		if (!isSameAsPreviousRow[i] && start) {
			ranges.push([start, i]);
			start = null;
		}
	}

	if (start) {
		ranges.push([start, width - 1]);
	}

	return ranges;
};
