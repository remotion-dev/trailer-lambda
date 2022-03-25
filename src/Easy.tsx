import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {COLORS} from './colors';

export const Easy: React.FC<{
	width: number;
}> = ({width}) => {
	const {height} = useVideoConfig();
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
					Easy
				</h1>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
