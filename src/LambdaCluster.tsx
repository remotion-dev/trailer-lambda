import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {
	GreekLetter,
	greekLetterOriginalHeight,
	greekLetterOriginalWidth,
} from './Lambda/GreekLetter';

const greekLetterWidth = 40;
const greekLetterHeight =
	(greekLetterWidth / greekLetterOriginalWidth) * greekLetterOriginalHeight;

export const Cluster: React.FC<{
	actualWidth: number | null;
}> = ({actualWidth}) => {
	const frame = useCurrentFrame();
	const config = useVideoConfig();
	const spr = spring({
		fps: config.fps,
		frame,
		config: {
			damping: 200,
			mass: 10,
		},
	});
	const overallScale = spring({
		fps: config.fps,
		frame: frame - 10,
		config: {
			damping: 200,
		},
	});
	const width = actualWidth ?? config.width;
	const LAMBDAS = interpolate(spr, [0, 1], [0, 6]);
	return (
		<AbsoluteFill
			style={{
				transform: `scale(${overallScale})`,
			}}
		>
			{new Array(Math.ceil(LAMBDAS)).fill(true).map((_, index) => {
				const i = Math.ceil(LAMBDAS) - index - 1;
				const scale = i + 1 <= Math.floor(LAMBDAS) ? 1 : LAMBDAS % 1;
				const radius = scale * 250;
				const angle = (i / LAMBDAS) * Math.PI * 2 - frame * 0.03;
				const x = Math.sin(angle) * radius;
				const y = Math.cos(angle) * radius;

				const pathToCenter = [
					`M ${x + width / 2} ${y + config.height / 2}`,
					`L ${width / 2} ${config.height / 2}`,
				].join(' ');

				return (
					<AbsoluteFill>
						<AbsoluteFill>
							<svg
								viewBox={`0 0 ${width} ${config.height}`}
								style={{
									position: 'absolute',
								}}
							>
								<path d={pathToCenter} stroke="#000" strokeWidth={7} />
							</svg>
						</AbsoluteFill>
						<AbsoluteFill
							key={i}
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								transform: `translateX(${x}px) translateY(${y}px) scale(${scale})`,
							}}
						>
							<div
								style={{
									width: 120,
									height: 120,
									backgroundColor: 'white',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									borderRadius: 60,
									border: '7px solid black',
								}}
							>
								<GreekLetter
									alternate
									width={greekLetterWidth}
									height={greekLetterHeight}
									color={COLORS[0]}
								/>
							</div>
						</AbsoluteFill>
					</AbsoluteFill>
				);
			})}
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					transform: `scale(1.2)`,
				}}
			>
				<div
					style={{
						width: 120,
						height: 120,
						backgroundColor: COLORS[0],
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						borderRadius: 60,
						border: '7px solid ' + COLORS[0],
					}}
				>
					<GreekLetter
						alternate
						width={greekLetterWidth}
						height={greekLetterHeight}
						color="white"
					/>
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
