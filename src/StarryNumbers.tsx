import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Series,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {StarryNumber} from './StarryNumber';
import {ToReactStarry} from './ToReactStarry';

export const StarryNumbers: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const scale =
		spring({
			fps,
			frame,
			config: {
				damping: 200,
			},
		}) * interpolate(frame, [0, 500], [1, 1.5]);
	return (
		<AbsoluteFill style={{transform: `scale(${scale})`}}>
			<Series>
				<Series.Sequence durationInFrames={35}>
					<StarryNumber from="30" to="30" />
				</Series.Sequence>
				<Series.Sequence durationInFrames={35}>
					<StarryNumber from="30" to="25" />
				</Series.Sequence>
				<Series.Sequence durationInFrames={35}>
					<StarryNumber from="25" to="20" />
				</Series.Sequence>
				<Series.Sequence durationInFrames={120}>
					<ToReactStarry />
				</Series.Sequence>
			</Series>
		</AbsoluteFill>
	);
};
