import React from 'react';
import {AbsoluteFill, Sequence, Series} from 'remotion';
import {EndCard} from './EndCard';
import {NormallyTakesMultiplied} from './NormallyTakesMultiplied';
import {Pitch} from './Pitch';
import {PricingToSourceAvailable} from './PricingToSourceAvailable';
import {ProductLineUp} from './ProductLineUp';
import {TimelineSplit} from './TimelineSplit';
import {Vis} from './Vis';
import {WayTooSlow} from './WayTooSlow';
import {WheelTransition} from './WheelTransition';

export const Main: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			{/* <Audio src={staticFile('voiceover-all.mp3')} /> */}
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
					<Series.Sequence durationInFrames={360}>
						<WheelTransition delay={0} type="in">
							<TimelineSplit />
						</WheelTransition>
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
