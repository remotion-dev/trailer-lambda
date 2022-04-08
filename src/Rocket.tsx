import React, {useMemo, useState} from 'react';
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
import {COLORS} from './colors';

const svgHoleSize = 906;
const originalSvgWidth = 1729;
const originalSvgHeight = 2712;
const remotionHolesize = 600;
const ratio = remotionHolesize / svgHoleSize;

const actualSvgWidth = ratio * originalSvgWidth;
const actualSvgHeight = ratio * originalSvgHeight;

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

	const points = useMemo(() => {
		return new Array(200).fill(true).map((_, i) => {
			const spread = interpolate(i, [0, 150, 200], [10, 180, 80]);
			const ry = noi.noise2D(frame / 50, i) * spread;
			const rx = noi2.noise2D(frame / 50, i) * 10;
			const stopDrawing = frame > springDuration + i * 0.05 + delay;
			if (stopDrawing && fumeOut) {
				return null;
			}

			return {
				x: interpolate(i / 200, [0, 1], [originX, rocket1PosX]) + rx + x,
				y: interpolate(i / 200, [0, 1], [originY, rocket1PosY]) + ry + y,
				color: interpolateColors(i, [0, 200], [COLORS[0], 'white']),
				size:
					70 *
					interpolate(scalenoise.noise2D(frame / 50, i), [-1, 1], [0.9, 1.1]),
			};
		}, []);
	}, [
		frame,
		originX,
		originY,
		rocket1PosY,
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
			<svg
				width={width}
				height={height}
				viewBox={`0 0 ${width} ${height}`}
				style={{
					position: 'absolute',
				}}
			>
				{points.map((point) => {
					if (!point) {
						return null;
					}
					return (
						<circle
							cx={point?.x}
							cy={point.y}
							fill={point.color}
							r={point.size}
						/>
					);
				})}
			</svg>
			<svg
				width={actualSvgWidth}
				height={actualSvgHeight}
				viewBox="0 0 1729 2712"
				fill="none"
				style={{
					position: 'absolute',
					height: size,
					width: size,
					transform: `rotate(${rot + angle + Math.PI / 2}rad) `,
					marginLeft: x - size / 2 + rocket1PosX,
					marginTop: y - size / 2 + rocket1PosY,
				}}
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1311 1738L1550 2061.5L1693.46 2656.1C1698.72 2673.48 1702.77 2690.18 1705.5 2706L1693.46 2656.1C1627.25 2437.22 1369.23 2111.5 1129 2111.5C1129 2111.5 1190 1827.67 1311 1738Z"
					fill="#0B84F3"
				/>
				<path
					d="M1311 1738L1550 2061.5L1705.5 2706C1668.34 2491 1388.3 2111.5 1129 2111.5C1129 2111.5 1190 1827.67 1311 1738Z"
					stroke="#0B84F3"
					strokeWidth="47"
				/>
				<path
					d="M418.5 1738L179.504 2061.5L36.041 2656.1C30.7831 2673.48 26.7346 2690.18 24.0005 2706L36.041 2656.1C102.256 2437.22 360.278 2111.5 600.504 2111.5C600.504 2111.5 539.5 1827.67 418.5 1738Z"
					fill="#0B84F3"
				/>
				<path
					d="M418.5 1738L179.504 2061.5L24.0005 2706C61.1672 2491 341.203 2111.5 600.504 2111.5C600.504 2111.5 539.5 1827.67 418.5 1738Z"
					stroke="#0B84F3"
					strokeWidth="47"
				/>
				<path
					d="M864.501 2151.5C1993.84 2151.5 1345.43 900.666 945.012 151.329C911.686 88.9634 820.98 90.7834 789.493 154.097C414.658 907.806 -263.971 2151.5 864.501 2151.5Z"
					fill="#0B84F3"
					stroke="#0B84F3"
					strokeWidth="47"
				/>
				<circle cx={1729 / 2} cy={1600} r={300} fill="white" />
			</svg>
		</div>
	);
};
