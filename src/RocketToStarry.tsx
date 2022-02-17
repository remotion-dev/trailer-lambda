import React from 'react';
import {AbsoluteFill} from 'remotion';
import {RocketShip} from './RocketShip';

export const RocketToStarry: React.FC = () => {
	return (
		<AbsoluteFill>
			<AbsoluteFill>
				<RocketShip />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
