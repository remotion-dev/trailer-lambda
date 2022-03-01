import React from 'react';
import {AbsoluteFill, Sequence} from 'remotion';
import {IsSlow} from './IsSlow';
import {ThisVideoMultiplied} from './ThisVideoMultiplied';

export const Pitch: React.FC = () => {
	return (
		<AbsoluteFill>
			<Sequence from={0}>
				<IsSlow />
			</Sequence>
			<Sequence from={50}>
				<ThisVideoMultiplied />
			</Sequence>
		</AbsoluteFill>
	);
};
