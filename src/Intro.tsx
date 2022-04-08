import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const Intro: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const opacity = interpolate(
		frame,
		[durationInFrames - 25, durationInFrames - 10],
		[1, 0]
	);
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'white',
			}}
		>
			<div
				style={{
					fontFamily: 'SF Pro Display',
					color: 'black',
					fontSize: 100,
					textAlign: 'center',
					fontWeight: 'bold',
					opacity,
				}}
			>
				The following video
				<br />
				was written in React.
			</div>
		</AbsoluteFill>
	);
};
