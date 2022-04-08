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

export const Docs: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const [sfProBold] = useState(() => ensureSFProBold());
	const scale = spring({
		fps,
		frame: frame - 30,
		config: {
			damping: 200,
		},
	});
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				transform: `translateY(${interpolate(scale, [0, 1], [600, 0])}px)`,
			}}
		>
			<div
				style={{
					fontFamily: sfProBold,
					fontSize: '2.5em',
					fontWeight: 'bold',
				}}
			>
				Explore the docs:
			</div>
			<div
				style={{
					fontFamily: sfProBold,
					fontSize: '3.5em',
					fontWeight: 'bold',
					color: COLORS[0],
				}}
			>
				remotion.dev/lambda
			</div>
		</AbsoluteFill>
	);
};
