import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {StarryNumber} from './StarryNumber';

export const ToReactStarry: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const animation = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});
	const scale = animation * 1.5 + 1;
	const rotationAnimation = interpolate(animation, [0.3, 1], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<AbsoluteFill
			style={{
				transform: `scale(${scale})`,
			}}
		>
			<StarryNumber from="20" to="react" />
			<AbsoluteFill
				style={{transform: `rotate(${120 * rotationAnimation}deg)`}}
			>
				<StarryNumber from="20" to="react" />
			</AbsoluteFill>
			<AbsoluteFill style={{transform: `rotate(${60 * rotationAnimation}deg)`}}>
				<StarryNumber from="20" to="react" />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
