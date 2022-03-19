import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from './colors';
import {FONT_SIZE} from './math/font-size';

export const BigNum: React.FC<{
	number: string;
}> = ({number}) => {
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					fontSize: FONT_SIZE * 0.975,
					color: COLORS[0],
					fontFamily: 'Assistant',
				}}
			>
				{String(number)}
			</div>
		</AbsoluteFill>
	);
};
