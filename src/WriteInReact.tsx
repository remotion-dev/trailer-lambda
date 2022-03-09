import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {AnimatedReactLogo} from './AnimatedReactLogo';
import {Cursor} from './Cursor';

export const WriteInReact: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const driver = spring({
		fps,
		frame,
		config: {
			damping: 200,
			mass: 2,
		},
	});

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<AbsoluteFill
				style={{
					transform: `scale(0.75) translateY(-200px)`,
				}}
			>
				<AnimatedReactLogo driver={driver} />
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					transform: `scale(0.5) translateY(1000px)`,
				}}
			>
				<Cursor driver={driver} />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
