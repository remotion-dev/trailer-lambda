import React from 'react';
import {AbsoluteFill, Loop} from 'remotion';
import {Vis} from './Vis';

export const MasterComp: React.FC = () => {
	return (
		<AbsoluteFill>
			<Loop durationInFrames={30 * 30}>
				<Vis />
			</Loop>
		</AbsoluteFill>
	);
};
