import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const greekLetterOriginalWidth = 463;
const greekLetterOriginalHeight = 738;

const greekLetterWidth = 200;
const greekLetterHeight = (200 / 463) * greekLetterOriginalHeight;

const GreekLetter: React.FC<{
	alternate: boolean;
}> = ({alternate}) => {
	return (
		<svg
			width={greekLetterWidth}
			height={greekLetterHeight}
			viewBox={`0 0 ${greekLetterOriginalWidth} ${greekLetterOriginalHeight}`}
			fill="none"
			style={{
				transform: alternate ? undefined : `rotate(180deg)`,
			}}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M203 264L1.5 737.5H16L82.5 737L239.5 363.5L375.5 733H443.5H461.5L183 1L115 26L203 264Z"
				fill="#0B84F3"
				stroke="#0B84F3"
			/>
		</svg>
	);
};

const lambdas = 200;

const fibonacci = (max: number): number => {
	let val = 0;
	for (let i = 0; i < max; i++) {
		val += i * 0.1;
	}
	return val;
};

const layers = 15;

export const Lambda: React.FC = () => {
	const frame = useCurrentFrame();
	const {height, width, fps} = useVideoConfig();
	const holeInTheMiddle = interpolate(frame, [0, 100], [0, 1200]);
	const staticScale =
		spring({
			fps,
			frame: frame - 70,
			config: {
				damping: 200,
			},
		}) *
			1.5 +
		interpolate(frame, [40, 100], [1, 2], {
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		});
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<AbsoluteFill style={{transform: `scale(${staticScale})`}}>
				{new Array(layers).fill(1).map((_, layer) => {
					const alternate = layer % 2 === 0;
					const staticRotation = interpolate(
						frame,
						[0, 1000],
						[0, (alternate ? -1 : 1) * Math.PI * 2]
					);
					const offsetWitouthold = (layer + 1) * 800;
					const offset = offsetWitouthold + holeInTheMiddle;
					const circumference = offsetWitouthold * Math.PI * 2;
					const lambasInACircle = Math.floor(
						(circumference / greekLetterOriginalWidth) * 0.7
					);
					return (
						<AbsoluteFill>
							{new Array(lambasInACircle).fill(1).map((_, i) => {
								const angle =
									(Math.PI * 2 * i) / lambasInACircle + staticRotation;
								const scale = 0.2;
								const translateY = Math.sin(angle) * offset;
								const translateX = Math.cos(angle) * offset;
								return (
									<div
										style={{
											position: 'absolute',
											left: width / 2 - greekLetterWidth / 2,
											top: height / 2 - greekLetterHeight / 2,
											transform: `scale(${scale}) translateX(${translateX}px) translateY(${translateY}px) rotate(${angle}rad)`,
										}}
									>
										<GreekLetter alternate={alternate} />
									</div>
								);
							})}
						</AbsoluteFill>
					);
				})}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
