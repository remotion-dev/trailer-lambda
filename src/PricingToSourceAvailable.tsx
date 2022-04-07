import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {Pricing} from './Pricing';
import {SourceAvailable} from './SourceAvailable';

export const PricingToSourceAvailable: React.FC = () => {
	return (
		<AbsoluteFill>
			<Series>
				<Series.Sequence durationInFrames={137}>
					<Pricing />
				</Series.Sequence>
				<Series.Sequence durationInFrames={100}>
					<SourceAvailable />
				</Series.Sequence>
			</Series>
		</AbsoluteFill>
	);
};
