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

export const MainVideo: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<Sequence durationInFrames={125} from={175}>
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
					<Series.Sequence durationInFrames={738}>
						<Vis />
					</Series.Sequence>
					<Series.Sequence durationInFrames={360}>
						<WheelTransition delay={0} type="in">
							<TimelineSplit />
						</WheelTransition>
					</Series.Sequence>
					<Series.Sequence durationInFrames={460}>
						<WheelTransition type="out" delay={450}>
							<ProductLineUp />
						</WheelTransition>
					</Series.Sequence>
				</Series>
			</Sequence>
			<Sequence durationInFrames={230} from={1918}>
				<WheelTransition type="in" delay={0}>
					<PricingToSourceAvailable />
				</WheelTransition>
			</Sequence>
			<Sequence from={2148}>
				<EndCard />
			</Sequence>
		</AbsoluteFill>
	);
};
