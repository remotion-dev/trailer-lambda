import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import SimplexNoise from 'simplex-noise';
import {Elevator} from './Elevator';
import {COUNTDOWN_DELAY} from './math/elevator';
import {VIDEO_FPS} from './math/fps';
import {RocketFumes} from './RocketFumes';
import {Upwind} from './Upwind';

const svgHoleSize = 906;
const originalSvgWidth = 1729;
const originalSvgHeight = 2712;
const remotionHolesize = 600;
const ratio = remotionHolesize / svgHoleSize;

const actualSvgWidth = ratio * originalSvgWidth;
const actualSvgHeight = ratio * originalSvgHeight;

const Rocket: React.FC<{
	entry: number;
	rocketOutroAnimation: number;
}> = ({entry, rocketOutroAnimation}) => {
	const {width} = useVideoConfig();

	const rocketTop = interpolate(entry, [0, 1], [actualSvgHeight, 0]);

	return (
		<AbsoluteFill
			style={{
				marginTop: -489 + rocketTop,
			}}
		>
			<RocketFumes estinguishProgress={rocketOutroAnimation} />
			<svg
				width={actualSvgWidth}
				height={actualSvgHeight}
				viewBox="0 0 1729 2712"
				fill="none"
				style={{
					position: 'absolute',
					left: width / 2 - actualSvgWidth / 2 - 3,
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
			</svg>
		</AbsoluteFill>
	);
};

const shake = new SimplexNoise('shake');
const shakeX = new SimplexNoise('shakex');
const rotate = new SimplexNoise('rotate');

export const RocketShip: React.FC = () => {
	const {height, width} = useVideoConfig();
	const frame = useCurrentFrame();

	const xOffset = shake.noise2D(0, frame / 30) * 30;
	const YOffset = shakeX.noise2D(0, frame / 30) * 30;
	const rotation = (rotate.noise2D(0, frame / 80) * Math.PI) / 10;

	const rocketEntryAnimation = spring({
		frame,
		fps: VIDEO_FPS,
		config: {
			damping: 200,
		},
	});

	const rocketOutroAnimation = spring({
		fps: VIDEO_FPS,
		frame: frame - 140,
		config: {
			damping: 200,
		},
	});

	const outOffsetY = interpolate(rocketOutroAnimation, [0, 1], [0, -2000]);

	const scale = interpolate(rocketEntryAnimation, [0, 1], [1, 0.5]);

	return (
		<AbsoluteFill>
			<Upwind />

			<AbsoluteFill
				style={{
					transform: `scale(${scale}) translateX(${xOffset}px) rotate(${rotation}rad)`,
				}}
			>
				<AbsoluteFill
					style={{
						transform: `translateY(${YOffset + outOffsetY}px)`,
					}}
				>
					<Rocket
						rocketOutroAnimation={rocketOutroAnimation}
						entry={rocketEntryAnimation}
					/>
				</AbsoluteFill>
				<AbsoluteFill>
					<div
						style={{
							height: remotionHolesize,
							width: remotionHolesize,
							display: 'flex',
							overflow: 'hidden',
							borderRadius: remotionHolesize / 2,
							backgroundColor: 'white',
							position: 'absolute',
							left: width / 2 - remotionHolesize / 2,
							top: height / 2 - remotionHolesize / 2,
						}}
					>
						<AbsoluteFill
							style={{
								marginLeft: -width / 2 + remotionHolesize / 2,
								marginTop: -height / 2 + remotionHolesize / 2,
							}}
						>
							<Elevator countDownDelay={COUNTDOWN_DELAY} />
						</AbsoluteFill>
					</div>
				</AbsoluteFill>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
