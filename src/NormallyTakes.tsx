import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from './colors';
import {BigNum} from './Number';

export const NormallyTakes: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const prog = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});

	const r = 375;
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
					<BigNum number={String(Math.round(prog * 60))} />
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

			<AbsoluteFill
				style={{
					top: 140,
				}}
			>
				<h1
					style={{
						fontFamily: 'SF Pro',
						fontSize: 120,
						color: COLORS[0],
						marginBottom: 0,
						marginTop: 0,
						fontWeight: 900,
						lineHeight: 1,
						textAlign: 'center',
					}}
				>
					Normally takes
				</h1>
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					bottom: 140,
					top: undefined,
				}}
			>
				<h1
					style={{
						fontFamily: 'SF Pro',
						fontSize: 120,
						color: COLORS[0],
						fontWeight: 900,
						lineHeight: 1,
						textAlign: 'center',
						position: 'absolute',
						bottom: 0,
						marginBottom: 0,
						width: '100%',
					}}
				>
					seconds to render
				</h1>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
