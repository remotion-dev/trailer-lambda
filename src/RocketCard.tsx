import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Checklist} from './Checklist';
import {Rockets} from './Rockets';

export const RocketCard: React.FC = () => {
	return (
		<AbsoluteFill>
			<AbsoluteFill>
				<Rockets />
			</AbsoluteFill>
			<AbsoluteFill>
				<Checklist />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
