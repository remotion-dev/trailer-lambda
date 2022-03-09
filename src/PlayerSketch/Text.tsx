import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Series,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLOR, CONTROLS_START, PLAY_START} from './const';

const InnerText: React.FC<{text: string}> = ({text}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const prog = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});
	return (
		<AbsoluteFill
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontFamily: 'Fira Code',
				color: COLOR,
				fontSize: 70,
				transform: `scale(${interpolate(prog, [0, 1], [0.7, 1])})`,
			}}
		>
			{text}
		</AbsoluteFill>
	);
};

export const Text: React.FC = () => {
	return (
		<Series>
			<Series.Sequence durationInFrames={CONTROLS_START}>
				<InnerText text="<Player />" />
			</Series.Sequence>
			<Series.Sequence durationInFrames={PLAY_START - CONTROLS_START}>
				<InnerText text="controls" />
			</Series.Sequence>
			<Series.Sequence durationInFrames={300}>
				<InnerText text=".play()" />
			</Series.Sequence>
		</Series>
	);
};
