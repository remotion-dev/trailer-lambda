import React from 'react';
import {AbsoluteFill, random, Sequence} from 'remotion';
import {BackgroundNoise} from './BackgroundNoise';
import {Spin} from './Spin';

export const ManySpin: React.FC = () => {
	return (
		<AbsoluteFill>
			<BackgroundNoise />
			{new Array(100).fill(1).map((_, i) => {
				return (
					<Sequence
						key={String(i)}
						from={parseInt(String(random(i) * 300), 10)}
						durationInFrames={Infinity}
					>
						<Spin seed={String(i)} />;
					</Sequence>
				);
			})}
		</AbsoluteFill>
	);
};
