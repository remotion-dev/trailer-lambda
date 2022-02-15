import React from 'react';
import {AbsoluteFill, interpolate, Series, useCurrentFrame} from 'remotion';
import {StarryNumber} from './StarryNumber';

export const StarryNumbers: React.FC = () => {
	const frame = useCurrentFrame();
	const scale = interpolate(frame, [0, 500], [1, 1.7]);
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'black',
			}}
		>
			<AbsoluteFill style={{transform: `scale(${scale})`}}>
				<Series>
					<Series.Sequence durationInFrames={35}>
						<StarryNumber from="30" to="29" />
					</Series.Sequence>
					<Series.Sequence durationInFrames={35}>
						<StarryNumber from="29" to="28" />
					</Series.Sequence>
					<Series.Sequence durationInFrames={35}>
						<StarryNumber from="28" to="27" />
					</Series.Sequence>
					<Series.Sequence durationInFrames={35}>
						<StarryNumber from="27" to="26" />
					</Series.Sequence>
					<Series.Sequence durationInFrames={35}>
						<StarryNumber from="26" to="25" />
					</Series.Sequence>
					<Series.Sequence durationInFrames={35}>
						<StarryNumber from="25" to="24" />
					</Series.Sequence>
					<Series.Sequence durationInFrames={35}>
						<StarryNumber from="24" to="23" />
					</Series.Sequence>
					<Series.Sequence durationInFrames={35}>
						<StarryNumber from="23" to="22" />
					</Series.Sequence>
					<Series.Sequence durationInFrames={35}>
						<StarryNumber from="22" to="21" />
					</Series.Sequence>
					<Series.Sequence durationInFrames={35}>
						<StarryNumber from="21" to="20" />
					</Series.Sequence>
				</Series>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
