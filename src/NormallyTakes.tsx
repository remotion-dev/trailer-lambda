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
	const pressIn = spring({
		fps,
		frame: frame - dur + 3,
		config: {
			mass: 0.6,
		},
	});
	const linearProgress = interpolate(frame, [0, dur - 1], [0, 1], {
		extrapolateRight: 'clamp',
	});

	const r = 320;
	const tickLength = 90;
	const grownTickLength =
		spring({
			fps,
			frame: frame - 2,
			config: {
				mass: 0.4,
			},
		}) * tickLength;
	const circum = r * Math.PI * 2;
	const strokeDashArray = `${circum}`;
	const pressTickLength = interpolate(
		pressIn,
		[0, 0.5, 1],
		[tickLength, tickLength / 2, tickLength]
	);

	const dashOffset = circum - prog * circum;

	const angle = -0.8 + Math.PI;
	const point1timer = [
		Math.sin(angle) * r + width / 2,
		Math.cos(angle) * r + height / 2,
	];
	const point2timer = [
		Math.sin(angle) * (r + grownTickLength) + width / 2,
		Math.cos(angle) * (r + grownTickLength) + height / 2,
	];

	return (
		<AbsoluteFill>
			<AbsoluteFill>
				<AbsoluteFill>
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
							fill="white"
							strokeWidth={60}
							strokeDasharray={strokeDashArray}
							strokeDashoffset={dashOffset}
							strokeLinecap="round"
						/>
					</svg>
				</AbsoluteFill>
				<AbsoluteFill
					style={{
						justifyContent: 'center',
						alignItems: 'center',
						transform: `scale(0.9)`,
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
					<svg width={width} height={height}>
						{/** Stopwatch button */}
						<path
							d={`M ${width / 2} ${height / 2 - r} L ${width / 2} ${
								height / 2 - r - pressTickLength
							}`}
							stroke={COLORS[0]}
							strokeWidth={60}
							strokeLinecap="round"
						/>
						<path
							d={`M ${width / 2 - 50} ${height / 2 - r - pressTickLength} L ${
								width / 2 + 50
							} ${height / 2 - r - pressTickLength}`}
							stroke={COLORS[0]}
							strokeWidth={60}
							strokeLinecap="round"
						/>
						{frame > 3 ? (
							<path
								d={`M ${point1timer[0]} ${point1timer[1]} L ${point2timer[0]} ${point2timer[1]}`}
								stroke={COLORS[0]}
								strokeWidth={60}
								strokeLinecap="round"
							/>
						) : null}
					</svg>
				</AbsoluteFill>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
