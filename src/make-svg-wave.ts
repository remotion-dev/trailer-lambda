const getTopOffset = ({
	radius,
	middleOfWave,
	amplitude,
	width,
	height,
}: {
	radius: number;
	middleOfWave: number;
	amplitude: number;
	width: number;
	height: number;
}) => {
	const xPos = Math.sin(middleOfWave * Math.PI * 2) * radius + width / 2;
	const yPos = Math.cos(middleOfWave * Math.PI * 2) * radius + height / 2;

	const cp1OffsetX = Math.sin(middleOfWave * Math.PI * 2) * amplitude;
	const cp1OffsetY = Math.cos(middleOfWave * Math.PI * 2) * amplitude;
	return {fromTop: yPos, fromLeft: xPos, cp1OffsetX, cp1OffsetY};
};

export type Point = {
	x: number;
	y: number;
};

type Statement =
	| {
			type: 'M';
			point: Point;
	  }
	| {
			type: 'C';
			to: Point;
			cp1: Point;
			cp2: Point;
	  };

export type SvgPath = Statement[];

export const svgPathToD = (svgPath: SvgPath) => {
	return svgPath
		.map((p) => {
			if (p.type === 'C') {
				return `C ${p.cp1.x} ${p.cp1.y} ${p.cp2.x} ${p.cp2.y} ${p.to.x} ${p.to.y}`;
			}
			if (p.type === 'M') {
				return `M ${p.point.x} ${p.point.y}`;
			}
		})
		.join(' ');
};

export const makeSvgWave = ({
	height,
	numberOfCurves,
	amplitude,
	radius,
	width,
	topOffset,
	rotation,
}: {
	height: number;
	numberOfCurves: number;
	amplitude: number;
	radius: number;
	width: number;
	topOffset: number;
	rotation: number;
}): Statement[] => {
	console.clear();
	const firstPoint = getTopOffset({
		radius,
		middleOfWave: rotation,
		amplitude,
		width,
		height,
	});

	const statements: Statement[] = [
		{
			type: 'M',
			point: {
				x: firstPoint.fromLeft,
				y: firstPoint.fromTop + topOffset,
			},
		},
		...new Array(numberOfCurves).fill(true).map((curve, i): Statement => {
			const {fromTop, fromLeft} = getTopOffset({
				radius,
				middleOfWave: (i + 1) / numberOfCurves + rotation,
				amplitude,
				width,
				height,
			});
			const {
				fromLeft: offsetX,
				fromTop: offsetY,
				cp1OffsetX,
				cp1OffsetY,
			} = getTopOffset({
				radius,
				middleOfWave: (i + 0.5) / numberOfCurves + rotation,
				amplitude,
				width,
				height,
			});
			const to: Point = {x: fromLeft, y: fromTop + topOffset};
			const cp1: Point = {
				x: offsetX - cp1OffsetX,
				y: offsetY - cp1OffsetY + topOffset,
			};
			const cp2: Point = {
				x: offsetX + cp1OffsetX,
				y: offsetY + cp1OffsetY + topOffset,
			};
			return {
				type: 'C',
				to,
				cp1,
				cp2,
			};
		}),
	];
	return statements;
};
