import React from 'react';
import {AbsoluteFill, Sequence, Series} from 'remotion';
import {AnimatedNumber} from './AnimatedNumber';
import {InitialBigNum} from './InitialBigNumb';
import {Lambda} from './Lambda/Lambda';
import {RocketShip} from './RocketShip';
import {ManyWaves} from './Wave';

export const Vis: React.FC = () => {
	return (
		<AbsoluteFill>
			<Series>
				<Series.Sequence durationInFrames={25}>
					<AbsoluteFill
						style={{
							backgroundColor: 'white',
						}}
					/>
					<InitialBigNum />
				</Series.Sequence>
				<Series.Sequence durationInFrames={132}>
					<AbsoluteFill
						style={{
							backgroundColor: 'white',
						}}
					/>
					<Sequence from={0} durationInFrames={60}>
						<Lambda />
					</Sequence>
					<ManyWaves />
					<AnimatedNumber />
				</Series.Sequence>
				<Series.Sequence durationInFrames={800}>
					<RocketShip />
				</Series.Sequence>
			</Series>
		</AbsoluteFill>
	);
};
