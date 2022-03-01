import React from 'react';
import {AbsoluteFill, Audio, Sequence, Series, staticFile} from 'remotion';
import {NormallyTakes} from './NormallyTakes';
import {Pitch} from './Pitch';
import {TimelineSplit} from './TimelineSplit';
import {Vis} from './Vis';

export const MasterComp: React.FC = () => {
	return (
		<AbsoluteFill>
			<Audio src={staticFile('voiceover-first.m4a')} startFrom={50} />
			<Sequence from={40 * 30}>
				<Audio src={staticFile('voiceover-second.m4a')} startFrom={50} />
			</Sequence>
			<Series>
				<Series.Sequence durationInFrames={200}>
					<Pitch />
				</Series.Sequence>
				<Series.Sequence durationInFrames={250}>
					<NormallyTakes />
				</Series.Sequence>
				<Series.Sequence durationInFrames={700}>
					<Vis />
				</Series.Sequence>
				<Series.Sequence durationInFrames={200}>
					<TimelineSplit />
				</Series.Sequence>
			</Series>
		</AbsoluteFill>
	);
};
