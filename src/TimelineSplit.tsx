import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {FlatCasette} from './FlatCasette';
import {PIECES, TimelineSplitItem} from './TimelineSplitItem';

export const TimelineSplit: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const goBackTogether = spring({
		fps,
		frame: frame - 150,
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
					transform: `rotateY(${rotation}rad)`,
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
		</AbsoluteFill>
	);
};
