import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const WheelTransition: React.FC<{
	type: 'in' | 'out';
	delay: number;
}> = ({children, delay, type}) => {
	const {fps, height, width} = useVideoConfig();
	const frame = useCurrentFrame();
	const move = spring({
		fps,
		frame: frame - delay,
		config: {damping: 200},
	});

	const RADIUS = width * 2;

	const CENTER_POINT = {
		x: width / 2,
		y: height / 2 + RADIUS,
	};

	const CENTER_ANGLE = Math.PI;
	const END_ANGLE = CENTER_ANGLE + Math.PI * 0.2 * (type === 'in' ? 1 : -1);
	const ANGLE = interpolate(
		move,
		[0, 1],
		type === 'in' ? [END_ANGLE, CENTER_ANGLE] : [CENTER_ANGLE, END_ANGLE]
	);
	const XOFFSET = Math.sin(ANGLE) * RADIUS;
	const YOFFSET = Math.cos(ANGLE) * RADIUS;
	const DEGREE = Math.tan(ANGLE);

	return (
		<AbsoluteFill
			style={{
				top: CENTER_POINT.y - height / 2,
				left: CENTER_POINT.x - width / 2,
				transform: `translateX(${XOFFSET}px) translateY(${YOFFSET}px) rotate(${-DEGREE}rad)`,
			}}
		>
			{children}
		</AbsoluteFill>
	);
};
