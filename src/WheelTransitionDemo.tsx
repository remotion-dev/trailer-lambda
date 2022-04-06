import React from 'react';
import {AbsoluteFill} from 'remotion';
import {WheelTransition} from './WheelTransition';

export const WheelTransitionDemo: React.FC = () => {
	return (
		<AbsoluteFill>
			<WheelTransition>
				<AbsoluteFill style={{backgroundColor: 'red'}} />
			</WheelTransition>
		</AbsoluteFill>
	);
};
