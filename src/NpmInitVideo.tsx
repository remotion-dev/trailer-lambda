import React from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from './colors';

export const NpmInitVideo: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const scale = (delay: number) =>
		spring({
			fps,
			frame: frame - delay,
			config: {
				damping: 200,
			},
		});

	const blink = Math.round(frame / 30) % 2 === 1 ? 1 : 0;
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					fontFamily: 'SF Pro',
					fontSize: '2.5em',
					fontWeight: 'bold',
				}}
			>
				Get started with Remotion:
			</div>
			<div
				style={{
					fontFamily: 'SF Pro',
					fontSize: '5em',
					fontWeight: 900,
					color: COLORS[0],
					fontStyle: 'italic',
				}}
			>
				<span
					style={{
						display: 'inline-block',
						whiteSpace: 'pre',
						transform: `scale(${scale(0)})`,
					}}
				>
					npm{' '}
				</span>
				<span
					style={{
						display: 'inline-block',
						whiteSpace: 'pre',
						transform: `scale(${scale(4)})`,
					}}
				>
					init{' '}
				</span>
				<span
					style={{
						whiteSpace: 'pre',
						display: 'inline-block',
						transform: `scale(${scale(7)})`,
					}}
				>
					video
					<span
						style={{
							opacity: blink,
						}}
					>
						_
					</span>
				</span>
			</div>
		</AbsoluteFill>
	);
};
