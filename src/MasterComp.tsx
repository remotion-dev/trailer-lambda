import React from 'react';
import {AbsoluteFill, Audio, Sequence, Series, staticFile} from 'remotion';
import {FastCheapEasyScalable} from './FastCheapEasyScalable';
import {NormallyTakes} from './NormallyTakes';
import {Pitch} from './Pitch';
import {Pricing} from './Pricing';
import {ProductLineUp} from './ProductLineUp';
import {TimelineSplit} from './TimelineSplit';
import {Vis} from './Vis';
import {WayTooSlow} from './WayTooSlow';

const VOICEOVER_START = 35.5 * 30;

export const MasterComp: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			{/* <Audio
				src={staticFile('music.mp3')}
				startFrom={45 * 30 - 390}
				volume={(f) =>
					interpolate(
						f,
						[
							350,
							440,
							490,
							VOICEOVER_START - 2 * 30,
							VOICEOVER_START + 0.5 * 30,
							VOICEOVER_START + 3 * 30,
						],
						[0, 0.1, 1, 1, 0.1, 0],
						{
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						}
					)
				}
			/> */}
			<Audio src={staticFile('voiceover-first.m4a')} startFrom={50} />
			<Sequence from={VOICEOVER_START}>
				<Audio src={staticFile('voiceover-second.m4a')} startFrom={50} />
			</Sequence>
			<Sequence durationInFrames={50} from={175}>
				<NormallyTakes />
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
					<Series.Sequence durationInFrames={180}>
						<ProductLineUp />
					</Series.Sequence>
				</Series>
			</Sequence>
			<Sequence durationInFrames={100} from={300}>
				<WayTooSlow />
			</Sequence>
			<Sequence durationInFrames={200} from={2100}>
				<Pricing />
			</Sequence>
		</AbsoluteFill>
	);
};
