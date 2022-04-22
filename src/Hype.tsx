import React from 'react';
import {AbsoluteFill, Loop, Sequence} from 'remotion';
import {HypeCircles} from './HypeCircles';
import {HypeDate} from './HypeDate';
import {HypeLogo} from './HypeLogo';
import {HypeTrailer} from './HypeTrailer';

export const Hype: React.FC = () => {
	return (
		<AbsoluteFill>
			<Loop durationInFrames={197}>
				<AbsoluteFill
					style={{
						backgroundColor: '#2e2e2e',
					}}
				>
					<HypeCircles />
					<Sequence from={22}>
						<HypeTrailer />
					</Sequence>
					<Sequence from={134}>
						<HypeDate />
					</Sequence>
					<Sequence from={87}>
						<HypeLogo />
					</Sequence>
				</AbsoluteFill>
			</Loop>
		</AbsoluteFill>
	);
};
