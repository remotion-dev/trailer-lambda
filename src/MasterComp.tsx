import React from 'react';
import {AbsoluteFill, Loop, Series} from 'remotion';
import {Lambda} from './Lambda/Lambda';
import {ManySpin} from './ManySpin';
import {Rounder} from './Rounder';

export const MasterComp: React.FC = () => {
	return (
		<AbsoluteFill>
			<Loop durationInFrames={400}>
				<Series>
					<Series.Sequence durationInFrames={100}>
						<Lambda />
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
