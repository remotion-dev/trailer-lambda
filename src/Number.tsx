import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from './colors';

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
					color: COLORS[0],
					fontSize: 400,
					fontFamily: 'SF Pro Rounded',
					fontWeight: 900,
				}}
			>
				{number}
			</div>
		</AbsoluteFill>
	);
};
