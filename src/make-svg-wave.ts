import {interpolate} from 'remotion';

const getTopOffset = (
	radius: number,
	width: number,
	middleOfWave: number,
	amplitude: number
) => {
	const timesBiggerThanWidth = width / radius;
	const pos = interpolate(
		middleOfWave,
		[0, width],
		[
			-(Math.PI / 2) * timesBiggerThanWidth,
			+(Math.PI / 2) * timesBiggerThanWidth,
		]
	);
	const xPos = Math.sin(pos + Math.PI / 2) * radius;
	const yPos = Math.cos(pos + Math.PI / 2) * radius;

	const cp1OffsetX = Math.cos(pos + Math.PI / 2) * amplitude;
	const cp1OffsetY = Math.sin(pos + Math.PI / 2) * amplitude;
	console.log({pos});
	const fromTop = radius - xPos;
	const fromLeft = radius - yPos;
	return {fromTop, fromLeft, cp1OffsetX, cp1OffsetY};
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
	width,
	height,
	numberOfCurves,
	amplitude,
	radius,
}: {
	width: number;
	height: number;
	numberOfCurves: number;
	amplitude: number;
	radius: number;
}): Statement[] => {
	console.clear();
	const waveWidth = width / numberOfCurves;
	const statements: Statement[] = [
		{
			type: 'M',
			point: {
				x: 0,
				y:
					height / 2 +
					getTopOffset(radius, width, -0.5 * waveWidth, amplitude).fromTop,
			},
		},
		...new Array(numberOfCurves).fill(true).map((curve, i): Statement => {
			const middleOfWave = (i + 0.5) * waveWidth;
			const {fromTop, cp1OffsetX, cp1OffsetY} = getTopOffset(
				radius,
				width,
				middleOfWave,
				amplitude
			);
			console.log({cp1OffsetX, cp1OffsetY});
			const to: Point = {x: (i + 1) * waveWidth, y: height / 2 + fromTop};
			const cp1: Point = {
				x: middleOfWave + cp1OffsetX,
				y: height / 2 + fromTop + cp1OffsetY,
			};
			const cp2: Point = {
				x: middleOfWave - cp1OffsetX,
				y: height / 2 + fromTop - cp1OffsetY,
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
