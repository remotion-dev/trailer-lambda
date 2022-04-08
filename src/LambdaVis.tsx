import React, {useMemo} from 'react';
import {
	AbsoluteFill,
	interpolate,
	interpolateColors,
	random,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {
	GreekLetter,
	greekLetterOriginalHeight,
	greekLetterOriginalWidth,
} from './Lambda/GreekLetter';
const greekLetterWidth = 55;
const greekLetterHeight =
	(greekLetterWidth / greekLetterOriginalWidth) * greekLetterOriginalHeight;
const ROCKET_SIZE = 150;

const LambdaBubble: React.FC = () => {
	return (
		<div
			style={{
				fontSize: ROCKET_SIZE,
				width: ROCKET_SIZE,
				height: ROCKET_SIZE,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				color: COLORS[0],
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
				color={COLORS[0]}
			/>
		</div>
	);
};

export const LambdaVis: React.FC<{
	seed: string;
}> = ({seed}) => {
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();

	const positions = useMemo(() => {
		return new Array(Math.max(2, frame + 1)).fill(1).map((_, i) => {
			const upward = interpolate(i, [0, 50], [height, -height / 2]);
			const randomXStart = random(String(seed)) * width;
			return {
				x: randomXStart,
				y: upward,
			};
		});
	}, [frame, height, seed, width]);

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
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
			</AbsoluteFill>
			<LambdaBubble />
		</AbsoluteFill>
	);
};
