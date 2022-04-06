import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const WheelTransition: React.FC = ({children}) => {
	const {fps, height, width} = useVideoConfig();
	const frame = useCurrentFrame();
	const move = spring({
		fps,
		frame,
		config: {damping: 200},
	});

	const RADIUS = width * 2;

	const CENTER_POINT = {
		x: width / 2,
		y: height / 2 + RADIUS,
	};

	const START_ANGLE = Math.PI;
	const ANGLE = interpolate(
		move,
		[0, 1],
		[START_ANGLE, START_ANGLE - Math.PI * 0.2]
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
