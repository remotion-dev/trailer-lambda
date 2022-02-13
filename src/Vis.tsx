import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {AnimatedNumber} from './AnimatedNumber';
import {Lambda} from './Lambda/Lambda';
import {ManySpin} from './ManySpin';
import {RocketShip} from './RocketShip';
import {ManyWaves} from './Wave';

export const Vis: React.FC = () => {
	return (
		<Series>
			<Series.Sequence durationInFrames={132}>
				<AbsoluteFill
					style={{
						backgroundColor: 'white',
					}}
				/>
				<Lambda />
				<ManyWaves />
				<AnimatedNumber />
			</Series.Sequence>
			<Series.Sequence durationInFrames={300}>
				<AbsoluteFill
					style={{
						backgroundColor: 'white',
					}}
				/>
				<RocketShip />
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
	);
};
