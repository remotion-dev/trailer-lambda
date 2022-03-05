import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {CheapNoise} from './CheapNoise';
import {COLORS} from './colors';

export const Cheap: React.FC<{
	width: number;
}> = ({width}) => {
	const {height} = useVideoConfig();
	return (
		<AbsoluteFill>
			<CheapNoise width={width} height={height} />
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
