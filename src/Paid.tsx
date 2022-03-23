import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';

export const Paid: React.FC<{
	start: number;
}> = ({start}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const progress = spring({
		fps,
		frame: frame - start,
		config: {
			damping: 200,
		},
	});

	const up = (delay: number) =>
		spring({
			fps,
			frame: frame - delay - start,
			config: {
				damping: 200,
			},
		});

	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					transform: ` translateY(${-220}px)`,
				}}
			>
				<div
					style={{
						border: '20px solid ' + COLORS[0],
						color: COLORS[0],
						display: 'inline-block',
						fontFamily: 'SF Pro',
						fontSize: 300,
						fontWeight: 'bold',
						paddingLeft: 50,
						paddingRight: 50,
						paddingTop: 20,
						paddingBottom: 20,
						borderRadius: 70,
						letterSpacing: '0.1em',
						overflow: 'hidden',
						transform: `scale(0.8)`,
					}}
				>
					<span
						style={{
							display: 'inline-block',
							transform: `translateY(${interpolate(
								up(10),
								[0, 1],
								[450, 0]
							)}px)`,
						}}
					>
						$
					</span>
					<span
						style={{
							display: 'inline-block',
							transform: `translateY(${interpolate(
								up(4),
								[0, 1],
								[400, 0]
							)}px)`,
						}}
					>
						$
					</span>
					<span
						style={{
							display: 'inline-block',
							transform: `translateY(${interpolate(
								up(12),
								[0, 1],
								[500, 0]
							)}px)`,
						}}
					>
						$
					</span>
				</div>
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					transform: `translateY(${180}px)`,
				}}
			>
				<div
					style={{
						color: COLORS[0],
						display: 'inline-block',
						fontFamily: 'SF Pro',
						fontSize: 120,
						fontWeight: 'bold',
						textAlign: 'center',
					}}
				>
					Company licensing <br /> available
				</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
