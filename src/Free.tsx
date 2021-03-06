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

export const Free: React.FC = () => {
	const [sfPro] = useState(() => ensureSFProBold());
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});

	const scale = interpolate(progress, [0, 1], [1, 0.8]);

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					transform: `scale(${scale}) translateY(${-180}px)`,
				}}
			>
				<div
					style={{
						border: '20px solid ' + COLORS[0],
						color: COLORS[0],
						display: 'inline-block',
						fontFamily: sfPro,
						fontSize: 300,
						fontWeight: 'bold',
						paddingLeft: 80,
						paddingRight: 80,
						paddingTop: 20,
						paddingBottom: 20,
						borderRadius: 70,
					}}
				>
					Free
				</div>
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					transform: `translateY(${150}px)`,
				}}
			>
				<div
					style={{
						color: 'black',
						display: 'inline-block',
						fontFamily: sfPro,
						fontSize: 120,
						fontWeight: 'bold',
					}}
				>
					for individuals
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
