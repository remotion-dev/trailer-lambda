import React, {useState} from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {ensureSFProBold} from './load-font';

export const IsOnGitHub: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const [sfPro] = useState(() => ensureSFProBold());

	const scale = spring({
		fps,
		frame: frame - 50,
		config: {
			damping: 200,
		},
	});

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				transform: `translateY(${interpolate(scale, [0, 1], [300, 0])}px)`,
			}}
		>
			<div
				style={{
					fontFamily: sfPro,
					fontSize: '2.5em',
					fontWeight: 'bold',
				}}
			>
				This video is on GitHub:
			</div>
			<div
				style={{
					fontFamily: sfPro,
					fontSize: '3.5em',
					fontWeight: 'bold',
					color: COLORS[0],
				}}
			>
				remotion-dev/trailer-lambda
			</div>
		</AbsoluteFill>
	);
};
