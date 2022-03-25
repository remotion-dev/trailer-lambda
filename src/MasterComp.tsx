import React from 'react';
import {AbsoluteFill, Audio, Sequence, Series, staticFile} from 'remotion';
import {EndCard} from './EndCard';
import {NormallyTakesMultiplied} from './NormallyTakesMultiplied';
import {Pitch} from './Pitch';
import {PricingToSourceAvailable} from './PricingToSourceAvailable';
import {ProductLineUp} from './ProductLineUp';
import {RocketCard} from './RocketCard';
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
			<Audio src={staticFile('voiceover-all.mp3')} />
			<Sequence durationInFrames={200} from={175}>
				<NormallyTakesMultiplied />
			</Sequence>
			<Sequence durationInFrames={100} from={300}>
				<WayTooSlow />
			</Sequence>
			<Sequence from={0} durationInFrames={200}>
				<Pitch />
			</Sequence>
			<Sequence from={360}>
				<Series>
					<Series.Sequence durationInFrames={750}>
						<Vis />
					</Series.Sequence>
					<Series.Sequence durationInFrames={240}>
						<TimelineSplit />
					</Series.Sequence>
					<Series.Sequence durationInFrames={120}>
						<RocketCard />
					</Series.Sequence>
					<Series.Sequence durationInFrames={480}>
						<ProductLineUp />
					</Series.Sequence>
				</Series>
			</Sequence>
			<Sequence durationInFrames={200} from={1960}>
				<PricingToSourceAvailable />
			</Sequence>
			<Sequence from={2160}>
				<EndCard />
			</Sequence>
		</AbsoluteFill>
	);
};
