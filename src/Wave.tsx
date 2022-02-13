import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {COLORS} from './colors';
import {WAVES_START, WAVE_EVERY_FRAMES} from './math/waves';
import {Wave} from './SingleWave';

export const ManyWaves: React.FC = () => {
	const globaltopOffset = 0;
	return (
		<AbsoluteFill>
			{new Array(20).fill(true).map((_, index) => {
				return (
					<Sequence from={index * WAVE_EVERY_FRAMES + WAVES_START}>
						<Wave
							color={index % 2 === 0 ? COLORS[0] : 'white'}
							topOffset={globaltopOffset}
						/>
					</Sequence>
				);
			})}
		</AbsoluteFill>
	);
};
