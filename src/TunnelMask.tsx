import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {Tunnel} from './Tunnel';

export const TunnelMask: React.FC<{
	holeSize: number;
}> = ({holeSize}) => {
	const {width, height} = useVideoConfig();
	return (
		<AbsoluteFill
			style={{
				height: holeSize,
				width: holeSize,
				borderRadius: holeSize / 2,
				position: 'absolute',
				left: '50%',
				top: '50%',
				marginLeft: -holeSize / 2,
				marginTop: -holeSize / 2,
				overflow: 'hidden',
			}}
		>
			<AbsoluteFill
				style={{
					height,
					width,
					marginTop: (holeSize - height) / 2,
					marginLeft: (holeSize - width) / 2,
				}}
			>
				<Tunnel />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
