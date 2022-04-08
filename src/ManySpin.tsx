import React, {useState} from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {Cluster} from './LambdaCluster';
import {ensureSFProBold} from './load-font';

export const ManySpin: React.FC<{
	flipProgress: number | null;
	width: number | null;
}> = ({flipProgress, width}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const [sfPro] = useState(() => ensureSFProBold());
	const actualFlipProgress =
		flipProgress ??
		spring({
			fps,
			frame: frame - 60,
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
				<Cluster actualWidth={width} />
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
						fontFamily: sfPro,
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
						fontFamily: sfPro,
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
