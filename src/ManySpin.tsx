import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	random,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {Spin} from './Spin';

export const ManySpin: React.FC<{
	flipProgress: number | null;
}> = ({flipProgress}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const actualFlipProgress =
		flipProgress ??
		spring({
			fps,
			frame: frame - 50,
			config: {
				damping: 200,
			},
		});
	return (
		<AbsoluteFill>
			<AbsoluteFill
				style={{
					backgroundColor: 'white',
				}}
			/>
			<AbsoluteFill
				style={{
					transform: `rotateY(${interpolate(
						actualFlipProgress,
						[0, 1],
						[0, -Math.PI]
					)}rad)`,
					backfaceVisibility: 'hidden',
					opacity: 0.999,
				}}
			>
				{new Array(30).fill(1).map((_, i) => {
					return (
						<Sequence
							key={String(i)}
							from={parseInt(String(random(i) * 100), 10)}
						>
							<Spin seed={String(i)} />
						</Sequence>
					);
				})}
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					transform: `rotateY(${interpolate(
						actualFlipProgress,
						[0, 1],
						[Math.PI, 0]
					)}rad)`,
					backfaceVisibility: 'hidden',
				}}
			>
				<h1
					style={{
						fontFamily: 'SF Pro',
						fontSize: 80,
						color: COLORS[0],
						marginTop: 0,
						marginBottom: 0,
						fontWeight: 700,
						lineHeight: 1,
						textAlign: 'center',
					}}
				>
					Lambda
				</h1>
				<h2
					style={{
						fontFamily: 'SF Pro',
						fontSize: 35,
						color: '#444',
						marginTop: 20,
						marginBottom: 0,
						fontWeight: 700,
						lineHeight: 1,
						textAlign: 'center',
					}}
				>
					Render at scale
				</h2>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
