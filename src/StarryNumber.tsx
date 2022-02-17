import {BoundingBox} from 'opentype.js';
import React, {useMemo} from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {extendViewbox} from './extend-viewbox';
import {interpolateStarryNumber} from './get-starry-number';
import {getViewBoxFromBoundingBox} from './get-viewbox-from-bounding-box';
import {useFont} from './load-font';

export const StarryNumber: React.FC<{
	from: string;
	to: string;
}> = ({from, to}) => {
	const font = useFont();
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({
		fps,
		frame,
		config: {
			damping: 200,
			mass: 1,
		},
	});

	const path = useMemo(() => {
		if (!font) {
			return null;
		}

		return interpolateStarryNumber(from, to, font, progress);
	}, [font, from, progress, to]);

	if (!path) return null;

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'row',
			}}
		>
			{path.map((xxx) => {
				return (
					<div>
						<svg
							style={{
								height: 400,
								marginLeft: 20,
								marginRight: 20,
								transform: `scale(3)`,
							}}
							viewBox={extendViewbox(
								getViewBoxFromBoundingBox(xxx?.viewBox as BoundingBox),
								3
							)}
						>
							{xxx?.points.map((dot) => {
								return <circle cx={dot.x} cy={dot.y} r={2} fill="white" />;
							})}
						</svg>
					</div>
				);
			})}
		</AbsoluteFill>
	);
};
