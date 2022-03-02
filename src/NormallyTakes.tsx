import React from 'react';
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
import {BigNum} from './Number';

export const NormallyTakes: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const sprConfig: Partial<SpringConfig> = {
		damping: 200,
	};
	const dur = measureSpring({config: sprConfig, fps});
	const prog = spring({
		fps,
		frame,
		config: sprConfig,
	});
	const linearProgress = interpolate(frame, [0, dur - 1], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const r = 450;
	const circum = r * Math.PI * 2;
	const strokeDashArray = `${circum}`;

	const dashOffset = circum - prog * circum;

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<AbsoluteFill
				style={{
					transform: `scale(0.5)`,
				}}
			>
				<AbsoluteFill
					style={{
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<BigNum number={String(Math.round(linearProgress * 60))} />
				</AbsoluteFill>
				<AbsoluteFill
					style={{
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<svg
						width={width}
						height={height}
						style={{
							transform: `rotate(-90deg)`,
						}}
					>
						<circle
							cx={width / 2}
							cy={height / 2}
							r={r}
							stroke={COLORS[0]}
							fill="none"
							strokeWidth={65}
							strokeDasharray={strokeDashArray}
							strokeDashoffset={dashOffset}
							strokeLinecap="round"
						/>
					</svg>
				</AbsoluteFill>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
