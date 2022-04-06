import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {COLORS} from '../colors';
import {ensureFont} from '../load-font';

ensureFont();

export const TunnelNumber: React.FC<{
	number: string;
	isFinalNumber: boolean;
	focalPoint: readonly [number, number];
	scale: number;
}> = ({number, focalPoint, scale, isFinalNumber}) => {
	const rotation = interpolate(
		focalPoint[0],
		[0, 1],
		[Math.PI * 0.2, -Math.PI * 0.2]
	);

	return (
		<AbsoluteFill>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					perspective: 200,
				}}
			>
				<div
					style={{
						fontSize: 100,
						color: isFinalNumber ? COLORS[0] : 'white',
						textShadow: `0 0 ${interpolate(scale, [0, 10], [0, 1])}px #eee`,
						transform: `rotateY(${rotation}rad)`,
						fontFamily: 'Assistant',
					}}
				>
					{number}
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
