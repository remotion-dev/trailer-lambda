import React, {useEffect, useMemo, useRef} from 'react';
import {
	AbsoluteFill,
	interpolate,
	interpolateColors,
	random,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import SimplexNoise from 'simplex-noise';
import {point} from './point';

export const Spin: React.FC<{
	seed: string;
}> = ({seed}) => {
	const ROCKET_SIZE = interpolate(random(seed), [0, 1], [40, 200]);
	const noiseUpward = useMemo(() => {
		return new SimplexNoise('upward-' + seed);
	}, [seed]);

	const noiseX = useMemo(() => {
		return new SimplexNoise('x-' + seed);
	}, [seed]);

	const frame = useCurrentFrame();
	const canvasEl = useRef<HTMLCanvasElement>(null);
	const {width, height, durationInFrames} = useVideoConfig();

	const positions = useMemo(() => {
		let xNoise = 0;
		return new Array(frame + 1).fill(1).map((_, i) => {
			xNoise += noiseX.noise2D(i / 50, 0) * 20;
			const upward = interpolate(i, [0, 100], [height, -height / 2]);
			const upwardNoise = noiseUpward.noise2D(i / 50, 0) * 400;
			const randomXStart = random(String(seed)) * width;
			return {
				x: randomXStart + xNoise,
				y: upward + upwardNoise,
			};
		});
	}, [frame, height, noiseUpward, noiseX, seed, width]);

	useEffect(() => {
		if (!canvasEl.current) {
			return;
		}
		const canvas = canvasEl.current.getContext(
			'2d'
		) as CanvasRenderingContext2D;
		canvas.clearRect(0, 0, width, height);

		positions.forEach((pos, i) => {
			point({
				x: pos.x,
				y: pos.y,
				canvas,
				size: 5,
				color: interpolateColors(
					i,
					[frame - 40, frame],
					['rgba(255, 255, 255, 0)', '#4290f5']
				),
			});
		});
	}, [durationInFrames, frame, height, positions, width]);

	const dy = useMemo(() => {
		if (positions.length < 2) {
			return 0;
		}
		return (
			positions[positions.length - 1].y - positions[positions.length - 2].y
		);
	}, [positions]);

	const dx = useMemo(() => {
		if (positions.length < 2) {
			return 0;
		}
		return (
			positions[positions.length - 1].x - positions[positions.length - 2].x
		);
	}, [positions]);

	const rotation = Math.atan2(dy, dx);

	return (
		<AbsoluteFill>
			<canvas
				ref={canvasEl}
				width={width}
				height={height}
				style={{width, height}}
			/>
			<div
				style={{
					position: 'absolute',
					top: positions[positions.length - 1].y,
					left: positions[positions.length - 1].x,
					fontSize: ROCKET_SIZE,
					width: ROCKET_SIZE,
					height: ROCKET_SIZE,
					marginLeft: -ROCKET_SIZE / 2,
					marginTop: -ROCKET_SIZE / 2,
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					transform: `rotate(${rotation + Math.PI / 4}rad)`,
				}}
			>
				🚀
			</div>
		</AbsoluteFill>
	);
};
