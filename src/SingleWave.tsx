import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const Wave: React.FC<{
	color: string;
}> = ({color}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const progress = spring({
		fps,
		frame,
		config: {
			damping: 200,
			mass: 20,
		},
	});

	const radius = interpolate(progress, [0, 1], [0, 7000]);

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					height: radius,
					width: radius,
					position: 'absolute',
					backgroundColor: color,
					borderRadius: radius / 2,
				}}
			/>
		</AbsoluteFill>
	);
};
