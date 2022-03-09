import React, {useMemo} from 'react';
import {
	AbsoluteFill,
	interpolate,
	interpolateColors,
	random,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import SimplexNoise from 'simplex-noise';
import {COLORS} from './colors';
import {
	GreekLetter,
	greekLetterOriginalHeight,
	greekLetterOriginalWidth,
} from './Lambda/GreekLetter';
const greekLetterWidth = 55;
const greekLetterHeight =
	(greekLetterWidth / greekLetterOriginalWidth) * greekLetterOriginalHeight;

export const Spin: React.FC<{
	seed: string;
}> = ({seed}) => {
	const ROCKET_SIZE = 150;
	const noiseUpward = useMemo(() => {
		return new SimplexNoise('upward-' + seed);
	}, [seed]);

	const noiseX = useMemo(() => {
		return new SimplexNoise('x-' + seed);
	}, [seed]);

	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	const positions = useMemo(() => {
		let xNoise = 0;
		return new Array(Math.max(2, frame + 1)).fill(1).map((_, i) => {
			xNoise += noiseX.noise2D(i / 50, 0) * 20;
			const upward = interpolate(i, [0, 50], [height, -height / 2]);
			const upwardNoise = noiseUpward.noise2D(i / 50, 0) * 50;
			const randomXStart = random(String(seed)) * width;
			return {
				x: randomXStart + xNoise,
				y: upward + upwardNoise,
			};
		});
	}, [frame, height, noiseUpward, noiseX, seed, width]);

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
			<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				{positions.map((p, i) => {
					return (
						<circle
							r={10}
							cx={p.x}
							cy={p.y}
							fill={interpolateColors(
								i,
								[frame - 40, frame],
								['rgba(255, 255, 255, 0)', '#4290f5']
							)}
						/>
					);
				})}
			</svg>
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
					color: COLORS[0],
					fontFamily: 'SF Pro Display',
					transform: `rotate(${rotation + Math.PI / 2}rad)`,
					backgroundColor: 'white',
					boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
					borderRadius: ROCKET_SIZE / 2,
					zIndex: 2,
				}}
			>
				<GreekLetter
					alternate
					width={greekLetterWidth}
					height={greekLetterHeight}
				/>
			</div>
		</AbsoluteFill>
	);
};
