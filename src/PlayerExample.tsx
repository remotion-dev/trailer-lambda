import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Light} from './PlayerSketch/Light';

export const PlayerExample: React.FC<{
	width: number | null;
	delay: number;
	flipProgress: number | null;
}> = ({delay, width, flipProgress}) => {
	return (
		<AbsoluteFill>
			<Light flipProgress={flipProgress} delay={delay} width={width} />
		</AbsoluteFill>
	);
};
