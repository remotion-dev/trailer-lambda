import React from 'react';
import {AbsoluteFill} from 'remotion';
import {WheelTransition} from './WheelTransition';

export const WheelTransitionIn: React.FC = () => {
	return (
		<AbsoluteFill>
			<WheelTransition type="in" delay={0}>
				<AbsoluteFill style={{backgroundColor: 'red'}} />
			</WheelTransition>
		</AbsoluteFill>
	);
};

export const WheelTransitionOut: React.FC = () => {
	return (
		<AbsoluteFill>
			<WheelTransition type="out" delay={0}>
				<AbsoluteFill style={{backgroundColor: 'red'}} />
			</WheelTransition>
		</AbsoluteFill>
	);
};
