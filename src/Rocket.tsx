import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
	interpolate,
	interpolateColors,
	measureSpring,
	random,
	spring,
	SpringConfig,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import SimplexNoise from 'simplex-noise';
import {point} from './point';

export const Rocket: React.FC<{
	targetX: number;
	targetY: number;
	originX: number;
	originY: number;
	size: number;
	fumeOut: boolean;
	delay: number;
}> = ({originX, originY, size, targetX, targetY, fumeOut, delay}) => {
	const seed = useState(() => random(delay));

	const noi = useMemo(
		() => new SimplexNoise(String(random('hi' + seed))),
		[seed]
	);
	const noi2 = useMemo(
		() => new SimplexNoise(String(random('hi2' + seed))),
		[seed]
	);
	const xnoise = useMemo(
		() => new SimplexNoise(String(random('x' + seed))),
		[seed]
	);
	const ynoise = useMemo(
		() => new SimplexNoise(String(random('y' + seed))),
		[seed]
	);
	const rotnoise = useMemo(
		() => new SimplexNoise(String(random('rot' + seed))),
		[seed]
	);
	const scalenoise = useMemo(
		() => new SimplexNoise(String(random('scale' + seed))),
		[seed]
	);

	const canvas = useRef<HTMLCanvasElement>(null);
	const {width, height, fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const x = xnoise.noise2D(frame / 50, 0) * 30;
	const y = ynoise.noise2D(frame / 50, 0) * 30;
	const rot = rotnoise.noise2D(frame / 50, 0) * 0.05;

	const springConfig: Partial<SpringConfig> = {
		damping: 100,
		mass: 5,
	};

	const springDuration = measureSpring({...springConfig, fps});

	const rocketProg = spring({
		frame: frame - delay,
		fps,
		config: springConfig,
	});

	const rocket1PosX = interpolate(rocketProg, [0, 1], [originX, targetX]);
	const rocket1PosY = interpolate(rocketProg, [0, 1], [originY, targetY]);

	useEffect(() => {
		const context = canvas.current?.getContext(
			'2d'
		) as CanvasRenderingContext2D;

		if (!context) {
			return;
		}
		context.clearRect(0, 0, width, height);
		for (let i = 0; i < 200; i++) {
			const spread = interpolate(i, [0, 150, 200], [10, 180, 80]);
			const ry = noi.noise2D(frame / 50, i) * spread;
			const rx = noi2.noise2D(frame / 50, i) * 10;
			const stopDrawing = frame > springDuration + i * 0.05 + delay;
			if (stopDrawing && fumeOut) {
				continue;
			}
			point({
				x: interpolate(i / 200, [0, 1], [originX, rocket1PosX]) + rx + x,
				y: interpolate(i / 200, [0, 1], [originY, rocket1PosY]) + ry + y,
				canvas: context,
				color: interpolateColors(i, [0, 200], ['#F03C69', 'yellow']),
				size:
					70 *
					interpolate(scalenoise.noise2D(frame / 50, i), [-1, 1], [0.9, 1.1]),
			});
		}
	}, [
		frame,
		height,
		originX,
		originY,
		rocket1PosY,
		width,
		x,
		y,
		rocket1PosX,
		noi,
		noi2,
		springDuration,
		fumeOut,
		delay,
		scalenoise,
	]);

	const angle = Math.atan2(targetY - originY, targetX - originX);

	return (
		<div style={{position: 'absolute'}}>
			<canvas
				ref={canvas}
				width={width}
				height={height}
				style={{
					width,
					height,
					position: 'absolute',
					zIndex: 0,
				}}
			/>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 36 36"
				style={{
					position: 'absolute',
					height: size,
					width: size,
					transform: `rotate(${rot + angle + Math.PI / 4}rad) `,
					marginLeft: x - size / 2 + rocket1PosX,
					marginTop: y - size / 2 + rocket1PosY,
				}}
			>
				<path
					fill="#A0041E"
					d="M1 17l8-7 16 1 1 16-7 8s.001-5.999-6-12-12-6-12-6z"
				/>
				<path
					fill="#55ACEE"
					d="M35.999 0s-10 0-22 10c-6 5-6 14-4 16s11 2 16-4c10-12 10-22 10-22z"
				/>
				<path d="M26.999 5c-1.623 0-3.013.971-3.641 2.36.502-.227 1.055-.36 1.641-.36 2.209 0 4 1.791 4 4 0 .586-.133 1.139-.359 1.64 1.389-.627 2.359-2.017 2.359-3.64 0-2.209-1.791-4-4-4z" />
				<path
					fill="#A0041E"
					d="M8 28s0-4 1-5 13.001-10.999 14-10-9.001 13-10.001 14S8 28 8 28z"
				/>
			</svg>
		</div>
	);
};
