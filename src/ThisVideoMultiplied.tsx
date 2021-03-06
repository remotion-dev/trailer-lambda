import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {ThisVideo} from './ThisVideo';

const num = 4;

export const ThisVideoMultiplied: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, height} = useVideoConfig();
	const spread = spring({
		fps,
		frame: frame - 50,
		config: {
			damping: 200,
		},
	});

	return (
		<AbsoluteFill>
			{new Array(num).fill(true).map((t, i) => {
				const offset = interpolate(i, [0, num - 1], [-100, 100]);

				const moveOut = spring({
					fps,
					frame: frame - 120 - (num - i * 2),
					config: {
						damping: 200,
					},
				});
				const showSpecs = i === num - 1;
				return (
					<AbsoluteFill
						style={{
							transform: `translateX(${spread * -offset}px) translateY(${
								spread * offset + moveOut * height
							}px)`,
						}}
					>
						<ThisVideo showSpecs={showSpecs} frameNum={frame + (num - i)} />
					</AbsoluteFill>
				);
			})}
		</AbsoluteFill>
	);
};
