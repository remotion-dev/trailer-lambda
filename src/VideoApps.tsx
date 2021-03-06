import React, {useState} from 'react';
import {
	AbsoluteFill,
	interpolate,
	measureSpring,
	spring,
	SpringConfig,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {ensureSFProBold} from './load-font';

export const VideoApps: React.FC = () => {
	const fontSize = 80;

	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const [sfPro] = useState(() => ensureSFProBold());
	const delay = 45;
	const sprconfig: Partial<SpringConfig> = {
		damping: 200,
	};
	const progress = spring({
		fps,
		frame: frame - delay,
		config: sprconfig,
	});
	const progress2 = spring({
		fps,
		frame: frame - delay - measureSpring({fps, config: sprconfig}),
		config: sprconfig,
	});
	const videoScale = interpolate(progress, [0, 1], [1, 0], {
		extrapolateRight: 'clamp',
	});
	const appsScale = interpolate(progress2, [0, 1], [0, 1], {
		extrapolateRight: 'clamp',
	});
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<h1
				style={{
					fontFamily: sfPro,
					fontSize,
					color: 'black',
					marginTop: 0,
					marginBottom: 0,
					fontWeight: 700,
					lineHeight: 1,
					textAlign: 'center',
					backgroundColor: 'white',
					justifyContent: 'center',
					verticalAlign: 'middle',
					display: 'inline-flex',
					alignItems: 'center',
					whiteSpace: 'pre',
				}}
			>
				Write{' '}
				<span
					style={{
						display: 'inline-block',
						whiteSpace: 'pre',
						fontSize: fontSize * videoScale,
					}}
				>
					videos{' '}
				</span>{' '}
				<span
					style={{
						display: 'inline-block',
						whiteSpace: 'pre',
						fontSize: fontSize * appsScale,
						color: COLORS[0],
					}}
				>
					video apps{' '}
				</span>{' '}
				in React.
			</h1>
		</AbsoluteFill>
	);
};
