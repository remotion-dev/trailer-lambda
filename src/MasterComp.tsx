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
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<Audio
				src={staticFile('music.mp3')}
				startFrom={45 * 30 - 390}
				volume={(f) =>
					interpolate(f, [440, 490, 36 * 30, 37 * 30], [0.1, 1, 1, 0.1], {
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})
				}
			/>
			<Audio src={staticFile('voiceover-first.m4a')} startFrom={50} />
			<Sequence from={36.5 * 30}>
				<Audio src={staticFile('voiceover-second.m4a')} startFrom={50} />
			</Sequence>
			<Sequence durationInFrames={150} from={175}>
				<NormallyTakes />
			</Sequence>
			<Sequence from={0} durationInFrames={200}>
				<Pitch />
			</Sequence>
			<Sequence from={375}>
				<Series>
					<Series.Sequence durationInFrames={800}>
						<Vis />
					</Series.Sequence>
					<Series.Sequence durationInFrames={200}>
						<TimelineSplit />
					</Series.Sequence>
				</Series>
			</Sequence>
		</AbsoluteFill>
	);
};
