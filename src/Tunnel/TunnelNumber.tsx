import React from 'react';
import {AbsoluteFill} from 'remotion';
import {ensureFont} from '../load-font';

ensureFont();

export const TunnelNumber: React.FC<{
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
					fontSize: 100,
					color: 'white',
					fontFamily: 'Assistant',
				}}
			>
				{number}
			</div>
		</AbsoluteFill>
	);
};
