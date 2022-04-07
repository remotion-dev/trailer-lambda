import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {FlatCasette} from './FlatCasette';
import {RocketCard} from './RocketCard';
import {PIECES, TimelineSplitItem} from './TimelineSplitItem';
import {WheelTransition} from './WheelTransition';

export const TimelineSplit: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const goBackTogether = spring({
		fps,
		frame: frame - 200,
		config: {
			damping: 200,
		},
	});

	const outFlipMark = 0.8;

	const outRotation = interpolate(
		goBackTogether,
		[outFlipMark, 1],
		[0, Math.PI],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	const rotation = interpolate(
		goBackTogether,
		[outFlipMark, 1],
		[-Math.PI, 0],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);
	const scale = interpolate(goBackTogether, [outFlipMark, 1], [0.7, 1]);

	const transitionToCard = spring({
		fps,
		frame: frame - 235,
		config: {
			damping: 200,
		},
	});

	const transitionRotation1 = interpolate(
		transitionToCard,
		[0, 1],
		[0, -Math.PI],
		{
			extrapolateRight: 'clamp',
		}
	);
	const transitionRotation2 = interpolate(
		transitionToCard,
		[0, 1],
		[Math.PI, 0],
		{
			extrapolateLeft: 'clamp',
		}
	);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
				perspective: 1000,
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				{new Array(PIECES).fill(true).map((_, i) => {
					return (
						<TimelineSplitItem
							outRotation={outRotation}
							goBackTogether={goBackTogether}
							index={i}
						/>
					);
				})}
			</div>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					backfaceVisibility: 'hidden',
					transform: `rotateY(${rotation + transitionRotation1}rad)`,
				}}
			>
				<FlatCasette
					style={{
						width: 300,
						transform: `scale(${scale})`,
					}}
					label="out.mp4"
				/>
			</AbsoluteFill>
			<WheelTransition type="out" delay={340}>
				<Sequence from={235} durationInFrames={120}>
					<AbsoluteFill
						style={{
							perspective: 1000,
						}}
					>
						<AbsoluteFill
							style={{
								backfaceVisibility: 'hidden',
								transform: `rotateY(${transitionRotation2}rad)`,
							}}
						>
							<RocketCard showRockets={transitionToCard > 0.99} />
						</AbsoluteFill>
					</AbsoluteFill>
				</Sequence>
			</WheelTransition>
		</AbsoluteFill>
	);
};
