import React from 'react';
import {AbsoluteFill, interpolate, Series, useCurrentFrame} from 'remotion';
import {StarryNumber} from './StarryNumber';

export const StarryNumbers: React.FC = () => {
	const frame = useCurrentFrame();
	const scale = interpolate(frame, [0, 500], [1, 1.5]);
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'black',
			}}
		>
			<AbsoluteFill style={{transform: `scale(${scale})`}}>
				<Series>
					<Series.Sequence durationInFrames={35}>
						<StarryNumber from="30" to="25" />
					</Series.Sequence>
					<Series.Sequence durationInFrames={35}>
						<StarryNumber from="25" to="20" />
					</Series.Sequence>
				</Series>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
