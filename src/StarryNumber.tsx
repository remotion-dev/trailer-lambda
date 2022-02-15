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

		const xxx = interpolateStarryNumber('40', '29', font, progress);
		return xxx;
	}, [font, progress]);

	if (!path) return null;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'black',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'row',
			}}
		>
			{path.map((xxx) => {
				return (
					<svg
						style={{height: 400}}
						viewBox={getViewBoxFromBoundingBox(xxx?.viewBox as BoundingBox)}
					>
						{xxx?.points.map((dot) => {
							return <circle cx={dot.x} cy={dot.y} r={2} fill="white" />;
						})}
					</svg>
				);
			})}
		</AbsoluteFill>
	);
};
