import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {COLORS} from './colors';
import {EasyNoise} from './EasyNoise';

export const Easy: React.FC<{
	width: number;
}> = ({width}) => {
	const {height} = useVideoConfig();
	return (
		<AbsoluteFill>
			<EasyNoise width={width} height={height} />
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
