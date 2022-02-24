import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {AnimatedNumber} from './AnimatedNumber';
import {Lambda} from './Lambda/Lambda';
import {ManySpin} from './ManySpin';
import {RocketToStarry} from './RocketToStarry';
import {ManyWaves} from './Wave';

export const Vis: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'black',
			}}
		>
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
				<Series.Sequence durationInFrames={800}>
					<RocketToStarry />
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
		</AbsoluteFill>
	);
};
