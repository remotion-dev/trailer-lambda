import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {StarryNumber} from './StarryNumber';
import {TunnelMask} from './TunnelMask';

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

	const scaleOut =
		spring({
			fps,
			frame: frame - 80,
			config: {
				damping: 200,
			},
		}) *
			10 +
		1;

	const initialHoleSize =
		spring({
			fps,
			frame: frame - 60,
			config: {
				damping: 300,
			},
		}) * 100;

	const holeSize =
		spring({
			fps,
			frame: frame - 80,
			config: {
				damping: 200,
			},
		}) *
			(1920 - initialHoleSize) +
		initialHoleSize;

	return (
		<AbsoluteFill>
			<Sequence from={0} durationInFrames={90}>
				<AbsoluteFill
					style={{
						transform: `scale(${scale * scaleOut})`,
					}}
				>
					<StarryNumber from="20" to="react" />
					<AbsoluteFill
						style={{transform: `rotate(${120 * rotationAnimation}deg)`}}
					>
						<StarryNumber from="20" to="react" />
					</AbsoluteFill>
					<AbsoluteFill
						style={{transform: `rotate(${60 * rotationAnimation}deg)`}}
					>
						<StarryNumber from="20" to="react" />
					</AbsoluteFill>
				</AbsoluteFill>
			</Sequence>

			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<TunnelMask holeSize={holeSize} />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
