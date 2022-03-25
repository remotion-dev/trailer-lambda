import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from './colors';

export const Fast: React.FC = () => {
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
					Fast
				</h1>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
