import React from 'react';
import {AbsoluteFill, Loop, Sequence, Series} from 'remotion';
import {Lambda} from './Lambda/Lambda';
import {ManySpin} from './ManySpin';
import {Rounder} from './Rounder';
import {ManyWaves} from './Wave';

export const MasterComp: React.FC = () => {
	return (
		<AbsoluteFill>
			<Loop durationInFrames={400}>
				<Series>
					<Series.Sequence durationInFrames={200}>
						<AbsoluteFill
							style={{
								backgroundColor: 'white',
							}}
						/>
						<Sequence from={100}>
							<ManyWaves />
						</Sequence>
						<Sequence from={20}>
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
		</AbsoluteFill>
	);
};
