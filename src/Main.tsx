import React from 'react';
import {AbsoluteFill, Audio, Series, staticFile} from 'remotion';
import {Intro} from './Intro';
import {MainVideo} from './MainVideo';

export const Main: React.FC = () => {
	return (
		<AbsoluteFill>
			<Audio src={staticFile('voiceover.wav')} />
			<Series>
				<Series.Sequence durationInFrames={60}>
					<Intro />
				</Series.Sequence>
				<Series.Sequence durationInFrames={2400 - 60}>
					<MainVideo />
				</Series.Sequence>
			</Series>
		</AbsoluteFill>
	);
};
