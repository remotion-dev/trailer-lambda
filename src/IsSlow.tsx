import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {remapSpeed} from './remap-speed';

export const IsSlow: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const remappedFrame = remapSpeed({
		frame,
		speed: (f) => interpolate(f, [0, 20], [0, 1], {extrapolateRight: 'clamp'}),
	});
	const progress = spring({
		fps,
		frame: remappedFrame,
		config: {
			damping: 200,
			mass: 4,
		},
	});

	const renderingFontSize = interpolate(progress, [0, 1], [120, 50]);
	const slowFontSize = interpolate(progress, [0, 1], [0, 500]);

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<h1
				style={{
					fontFamily: 'SF Pro',
					fontSize: renderingFontSize,
					color: 'black',
					marginTop: 0,
					marginBottom: 0,
					fontWeight: 700,
				}}
			>
				Rendering videos is
			</h1>
			<h1
				style={{
					fontFamily: 'SF Pro',
					fontSize: slowFontSize,
					color: COLORS[0],
					marginTop: 0,
					fontStyle: 'italic',
					marginBottom: 0,
					fontWeight: 900,
					lineHeight: 1,
				}}
			>
				slow
			</h1>
		</AbsoluteFill>
	);
};
