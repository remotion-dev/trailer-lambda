import React from 'react';
import {AbsoluteFill, interpolate} from 'remotion';
import {ensureFont} from '../load-font';

ensureFont();

export const TunnelNumber: React.FC<{
	number: string;
	focalPoint: readonly [number, number];
}> = ({number, focalPoint}) => {
	const _textShadowOffsetX = interpolate(focalPoint[0], [0, 1], [-4, 4]);
	const _textShadowOffsetY = interpolate(focalPoint[1], [0, 1], [-4, 4]);
	const textShadowOffsetX =
		_textShadowOffsetX + Math.sign(_textShadowOffsetX) * 1;
	const textShadowOffsetY =
		interpolate(focalPoint[1], [0, 1], [-8, 8]) +
		Math.sign(_textShadowOffsetY) * 1;

	const rotation = interpolate(
		focalPoint[0],
		[0, 1],
		[Math.PI * 0.2, -Math.PI * 0.2]
	);

	return (
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
					color: 'white',
					textShadow: `${textShadowOffsetX}px ${textShadowOffsetY}px black`,
					transform: `rotateY(${rotation}rad)`,
					fontFamily: 'Assistant',
				}}
			>
				{number}
			</div>
		</AbsoluteFill>
	);
};
