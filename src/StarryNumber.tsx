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
			mass: 0.7,
		},
	});

	const path = useMemo(() => {
		if (!font) {
			return null;
		}

		return interpolateStarryNumber({
			char1: from,
			char2: to,
			font,
			factor: progress,
			frame,
		});
	}, [font, from, progress, to, frame]);

	if (!path) return null;

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'row',
			}}
		>
			<div>
				<svg
					style={{
						height: 400,
						marginLeft: 20,
						marginRight: 20,
						transform: `scale(3)`,
					}}
					viewBox={extendViewbox(
						getViewBoxFromBoundingBox(path?.viewBox as BoundingBox),
						3
					)}
				>
					{path?.points.map((dot) => {
						return (
							<circle
								cx={dot.x}
								cy={dot.y}
								r={3}
								fill={`rgba(255, 255, 255, ${dot.opacity})`}
							/>
						);
					})}
				</svg>
			</div>
		</AbsoluteFill>
	);
};
