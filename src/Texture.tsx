import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	interpolateColors,
	random,
	useCurrentFrame,
} from 'remotion';

export const Texture: React.FC<{
	color1: string;
	color2: string;
}> = ({color1, color2}) => {
	const frame = useCurrentFrame();
	const step = Math.round(frame / 15);

	const seed = interpolate(random(step + color1 + color2), [0, 1], [0, 360]);

	return (
		<AbsoluteFill
			style={{
				backgroundImage: `linear-gradient(${seed}deg, ${interpolateColors(
					0.7,
					[0, 1],
					[color1, color2]
				)}, rgba(255, 255, 255, 0))`,
			}}
		/>
	);
};
