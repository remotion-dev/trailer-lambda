import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {remapSpeed} from './remap-speed';

export const WhatWillYouBuild: React.FC = () => {
	const frame = useCurrentFrame();

	const remappedFrame = remapSpeed({
		frame,
		speed: (f) => interpolate(f, [0, 30], [5, 0]),
	});

	const {fps} = useVideoConfig();
	const progress = (delay: number) =>
		spring({
			fps,
			frame: remappedFrame - delay,
			config: {
				damping: 200,
				mass: 8,
			},
		});

	return (
		<AbsoluteFill>
			<AbsoluteFill
				style={{
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<h1
					style={{
						fontFamily: 'SF Pro',
						fontSize: 180,
						color: COLORS[0],
						marginTop: 0,
						fontStyle: 'italic',
						marginBottom: 0,
						fontWeight: 900,
						lineHeight: 1,
						textAlign: 'center',
					}}
				>
					<span
						style={{
							display: 'block',
							transform: `scale(${progress(0)})`,
						}}
					>
						what
					</span>

					<span
						style={{
							display: 'block',
							transform: `scale(${progress(10)})`,
						}}
					>
						will
					</span>
					<span
						style={{
							display: 'block',
							transform: `scale(${progress(20)})`,
						}}
					>
						you
					</span>
					<span
						style={{
							display: 'block',
							transform: `scale(${progress(30)})`,
						}}
					>
						build?
					</span>
				</h1>
			</AbsoluteFill>
			<Sequence from={60}>
				<AbsoluteFill
					style={{
						backgroundColor: 'red',
					}}
				/>
			</Sequence>
		</AbsoluteFill>
	);
};
