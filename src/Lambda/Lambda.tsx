import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Mask} from '../Mask';
import {getLambdaHoleSize} from '../math/start-hug';
import {
	GreekLetter,
	greekLetterOriginalHeight,
	greekLetterOriginalWidth,
} from './GreekLetter';

const greekLetterWidth = 200;
const greekLetterHeight =
	(greekLetterWidth / greekLetterOriginalWidth) * greekLetterOriginalHeight;

const layers = 15;

export const Lambda: React.FC = () => {
	const frame = useCurrentFrame();
	const {height, width} = useVideoConfig();

	const holeInTheMiddle = getLambdaHoleSize(frame);
	const staticScale = 1;
	return (
		<AbsoluteFill style={{}}>
			<AbsoluteFill style={{transform: `scale(${staticScale})`}}>
				<Mask color="white" radius={holeInTheMiddle / 4} strokeWidth={0} />
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
										<GreekLetter
											width={greekLetterWidth}
											height={greekLetterHeight}
											alternate={alternate}
										/>
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
