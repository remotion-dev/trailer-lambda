import React from 'react';
import {
	AbsoluteFill,
	Audio,
	Loop,
	Sequence,
	Series,
	staticFile,
} from 'remotion';
import {Lambda} from './Lambda/Lambda';
import {ManySpin} from './ManySpin';
import {Rounder} from './Rounder';

export const MasterComp: React.FC = () => {
	return (
		<AbsoluteFill>
			<Loop durationInFrames={400}>
				<Series>
					<Series.Sequence durationInFrames={100}>
						<Sequence from={10}>
							<Lambda />
						</Sequence>
						<Rounder />
					</Series.Sequence>
					<Series.Sequence durationInFrames={100}>
						<ManySpin />
					</Series.Sequence>
					<Series.Sequence durationInFrames={100}>
						<ManySpin />
					</Series.Sequence>
					<Series.Sequence durationInFrames={100}>
						<ManySpin />
					</Series.Sequence>
				</Series>
			</Loop>
			<Audio src={staticFile('instrumental.mp3')} />
		</AbsoluteFill>
	);
};
