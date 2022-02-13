import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {Elevator} from './Elevator';
import {COUNTDOWN_DELAY} from './math/elevator';

const svgHoleSize = 906;
const originalSvgWidth = 1729;
const originalSvgHeight = 2712;
const remotionHolesize = 600;
const ratio = remotionHolesize / svgHoleSize;

const actualSvgWidth = ratio * originalSvgWidth;
const actualSvgHeight = ratio * originalSvgHeight;

const Rocket: React.FC = () => {
	const {width} = useVideoConfig();
	return (
		<svg
			width={actualSvgWidth}
			height={actualSvgHeight}
			viewBox="0 0 1729 2712"
			fill="none"
			style={{
				position: 'absolute',
				left: width / 2 - actualSvgWidth / 2 - 3,
				marginTop: -489,
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
	);
};

export const RocketShip: React.FC = () => {
	const {height, width} = useVideoConfig();
	return (
		<AbsoluteFill
			style={{
				transform: `scale(1)`,
			}}
		>
			<AbsoluteFill>
				<Rocket />
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
	);
};
