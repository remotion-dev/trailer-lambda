import React from 'react';
import {AbsoluteFill} from 'remotion';
import {COLORS} from './colors';

export const Scalable: React.FC = () => {
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
					Scalable
				</h1>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
