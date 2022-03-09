import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Light} from './PlayerSketch/Light';

export const PlayerExample: React.FC = () => {
	return (
		<AbsoluteFill>
			<Light theme="light" />
		</AbsoluteFill>
	);
};
