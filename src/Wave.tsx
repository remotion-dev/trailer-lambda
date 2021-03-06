import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {COLORS} from './colors';
import {NUMBER_OF_WAVES, WAVES_START, WAVE_EVERY_FRAMES} from './math/waves';
import {Wave} from './SingleWave';

export const ManyWaves: React.FC = () => {
	return (
		<AbsoluteFill>
			{new Array(NUMBER_OF_WAVES).fill(true).map((_, index) => {
				return (
					<Sequence from={index * WAVE_EVERY_FRAMES + WAVES_START}>
						<Wave color={index % 2 === 0 ? COLORS[0] : 'white'} />
					</Sequence>
				);
			})}
		</AbsoluteFill>
	);
};
