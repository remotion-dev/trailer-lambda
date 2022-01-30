import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {Wave} from './SingleWave';

export const ManyWaves: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	return (
		<AbsoluteFill>
			{new Array(20)
				.fill(true)
				.map((_, index) => {
					const progress = spring({
						fps,
						frame: frame - index * 10,
						config: {
							damping: 200,
							mass: 3,
						},
					});
					const topOffset = interpolate(frame, [0, 10], [0, 100]);
					return (
						<Sequence from={index * 10}>
							<Wave
								color={index % 2 === 0 ? COLORS[0] : 'white'}
								topOffset={-index * 100 + topOffset - 200}
							/>
						</Sequence>
					);
				})
				.reverse()}
		</AbsoluteFill>
	);
};
