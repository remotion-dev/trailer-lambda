import {BoundingBox} from 'opentype.js';
import React, {useMemo} from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame} from 'remotion';
import {interpolateStarryNumber} from './get-starry-number';
import {getViewBoxFromBoundingBox} from './get-viewbox-from-bounding-box';
import {useFont} from './load-font';

export const StarryNumber: React.FC = () => {
	const font = useFont();
	const frame = useCurrentFrame();
	const progress = interpolate(frame, [0, 100], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const path = useMemo(() => {
		if (!font) {
			return null;
		}

		const xxx = interpolateStarryNumber('R', '30', font, progress);
		return {
			viewBox: xxx.viewBox,
			points: xxx.points,
		};
	}, [font, progress]);

	if (!path) return null;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'black',
			}}
		>
			<svg viewBox={getViewBoxFromBoundingBox(path?.viewBox as BoundingBox)}>
				{path?.points.map((dot, i) => {
					return (
						<circle
							cx={dot.x}
							cy={dot.y}
							r={2}
							fill={i === 10 ? 'blue' : 'red'}
						/>
					);
				})}
			</svg>
		</AbsoluteFill>
	);
};
