import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {getNumbersize, numberToDisplay} from './math/number-timing';
import {BigNum} from './Number';

export const AnimatedNumber: React.FC = () => {
	const frame = useCurrentFrame();
	const scale = getNumbersize(frame);
	const toDisplay = String(numberToDisplay(frame));
	return (
		<AbsoluteFill style={{transform: `scale(${scale})`}}>
			<BigNum number={toDisplay} />
		</AbsoluteFill>
	);
};
