import React from 'react';
import {Point, SvgPath} from './make-svg-wave';

const DebugPoint: React.FC<{point: Point; color: string}> = ({
	point,
	color,
}) => {
	return <circle r={5} fill={color} cx={point.x} cy={point.y} />;
};

const DebugControlPoint: React.FC<{
	cp1: Point;
	cp2: Point;
}> = ({cp1, cp2}) => {
	return <path d={`M ${cp1.x} ${cp1.y} L ${cp2.x} ${cp2.y}`} stroke="gray" />;
};

export const DebugSvg: React.FC<{
	path: SvgPath;
}> = ({path}) => {
	return (
		<>
			{path.map((p) => {
				if (p.type === 'C') {
					return (
						<>
							<DebugPoint color="red" point={p.cp1} />
							<DebugPoint color="yellow" point={p.cp2} />
							<DebugPoint color="green" point={p.to} />
							<DebugControlPoint cp1={p.cp1} cp2={p.cp2} />
						</>
					);
				}
			})}
		</>
	);
};
