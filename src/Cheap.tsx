import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from './colors';

export const Cheap: React.FC<{
	width: number;
}> = ({width}) => {
	return (
		<AbsoluteFill>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<h1
					style={{
						fontFamily: 'SF Pro',
						color: COLORS[0],
						fontSize: 100,
					}}
				>
					Cheap
				</h1>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
