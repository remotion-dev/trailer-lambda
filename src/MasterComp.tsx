import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {NormallyTakes} from './NormallyTakes';
import {Pitch} from './Pitch';
import {TimelineSplit} from './TimelineSplit';
import {Vis} from './Vis';

export const MasterComp: React.FC = () => {
	return (
		<AbsoluteFill>
			<Series>
				<Series.Sequence durationInFrames={90}>
					<Pitch />
				</Series.Sequence>
				<Series.Sequence durationInFrames={70}>
					<NormallyTakes />
				</Series.Sequence>
				<Series.Sequence durationInFrames={700}>
					<Vis />
				</Series.Sequence>
				<Series.Sequence durationInFrames={100}>
					<TimelineSplit />
				</Series.Sequence>
			</Series>
		</AbsoluteFill>
	);
};
