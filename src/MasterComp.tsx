import React from 'react';
import {
	AbsoluteFill,
	Audio,
	interpolate,
	Sequence,
	Series,
	staticFile,
} from 'remotion';
import {NormallyTakes} from './NormallyTakes';
import {Pitch} from './Pitch';
import {TimelineSplit} from './TimelineSplit';
import {Vis} from './Vis';

export const MasterComp: React.FC = () => {
	return (
		<AbsoluteFill>
			<Sequence from={440}>
				<Audio
					src={staticFile('music.mp3')}
					startFrom={45 * 30}
					volume={(f) =>
						interpolate(
							f,
							[0, 50, 35 * 30 - 440, 36 * 30 - 440],
							[0, 1, 1, 0.1],
							{
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							}
						)
					}
				/>
			</Sequence>
			<Audio src={staticFile('voiceover-first.m4a')} startFrom={50} />
			<Sequence from={35 * 30}>
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
