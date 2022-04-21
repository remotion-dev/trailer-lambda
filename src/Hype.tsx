import React from 'react';
import {AbsoluteFill, Loop, Sequence} from 'remotion';
import {HypeCircles} from './HypeCircles';
import {HypeDate} from './HypeDate';
import {HypeLogo} from './HypeLogo';
import {HypeTrailer} from './HypeTrailer';

export const Hype: React.FC = () => {
	return (
		<Loop durationInFrames={197}>
			<AbsoluteFill>
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
	);
};
