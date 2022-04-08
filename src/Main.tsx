import React from 'react';
import {Series} from 'remotion';
import {Intro} from './Intro';
import {MainVideo} from './MainVideo';

export const Main: React.FC = () => {
	return (
		<Series>
			<Series.Sequence durationInFrames={60}>
				<Intro />
			</Series.Sequence>
			<Series.Sequence durationInFrames={2400 - 60}>
				<MainVideo />
			</Series.Sequence>
		</Series>
	);
};
