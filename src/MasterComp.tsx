import React from 'react';
import {AbsoluteFill, Audio, Sequence, Series, staticFile} from 'remotion';
import {FastCheapEasyScalable} from './FastCheapEasyScalable';
import {NormallyTakesMultiplied} from './NormallyTakesMultiplied';
import {Pitch} from './Pitch';
import {PricingToSourceAvailable} from './PricingToSourceAvailable';
import {ProductLineUp} from './ProductLineUp';
import {TimelineSplit} from './TimelineSplit';
import {Vis} from './Vis';
import {WayTooSlow} from './WayTooSlow';

export const MasterComp: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<Audio src={staticFile('voiceover-full.mp3')} />
			<Sequence durationInFrames={200} from={175}>
				<NormallyTakesMultiplied />
			</Sequence>
			<Sequence from={0} durationInFrames={200}>
				<Pitch />
			</Sequence>
			<Sequence from={375}>
				<Series>
					<Series.Sequence durationInFrames={800}>
						<Vis />
					</Series.Sequence>
					<Series.Sequence durationInFrames={200}>
						<TimelineSplit />
					</Series.Sequence>
					<Series.Sequence durationInFrames={180}>
						<FastCheapEasyScalable />
					</Series.Sequence>
					<Series.Sequence durationInFrames={500}>
						<ProductLineUp />
					</Series.Sequence>
				</Series>
			</Sequence>
			<Sequence durationInFrames={100} from={300}>
				<WayTooSlow />
			</Sequence>
			<Sequence durationInFrames={200} from={2000}>
				<PricingToSourceAvailable />
			</Sequence>
		</AbsoluteFill>
	);
};
