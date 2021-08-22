import React, {useEffect, useRef} from 'react';
import {
	AbsoluteFill,
	interpolate,
	random,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import SimplexNoise from 'simplex-noise';

const simplexopacity = new SimplexNoise('simplex-opacity');

const POINTS_X = 2000;

export const Dust: React.FC = () => {
	const frame = useCurrentFrame();
	const canvas = useRef<HTMLCanvasElement>(null);
	const {width, height} = useVideoConfig();
	const seed = random(Math.floor(frame / 6));

	useEffect(() => {
		const context = canvas.current?.getContext('2d');
		if (!context) {
			return;
		}
		context.clearRect(0, 0, width, height);
		for (let x = 0; x < POINTS_X; x++) {
			const rx = random(seed + x + 'rx');
			const ry = random(seed + x + 'ry');
			const strokeWidth = random(seed + x + 'simplex') * 5;
			const baseX = rx * width;
			const baseY = ry * height;
			const angleX = random(seed + x + 'x') * 2 - 1;
			const angleY = random(seed + x) * 2 - 1;
			const opacity = interpolate(random(seed + x), [0, 1], [0.1, 0.2]);
			const angleOffset = interpolate(random(seed + x), [0, 1], [5, 200]);
			context.beginPath();
			context.moveTo(baseX, baseY);
			context.lineTo(
				baseX + angleX * angleOffset,
				baseY + angleY * angleOffset
			);
			context.lineWidth = strokeWidth;
			context.lineCap = 'round';
			context.globalAlpha = opacity;
			context.strokeStyle = 'white';
			context.stroke();
		}
	}, [frame, height, seed, width]);
	return (
		<AbsoluteFill>
			<canvas
				ref={canvas}
				width={width}
				height={height}
				style={{width, height, position: 'absolute'}}
			/>
		</AbsoluteFill>
	);
};
