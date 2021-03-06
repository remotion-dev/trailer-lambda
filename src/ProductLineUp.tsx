import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {ManySpin} from './ManySpin';
import {PlayerExample} from './PlayerExample';
import {VideoApps} from './VideoApps';
import {WriteInReact} from './WriteInReact';

const TRANSITION_START = 330;

export const ProductLineUp: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, height, width} = useVideoConfig();

	const delay1 = 90;
	const prog1 = spring({
		fps,
		frame: frame - delay1,
		config: {
			damping: 200,
		},
	});

	const prog2 = spring({
		fps,
		frame: frame - 200,
		config: {
			damping: 200,
		},
	});

	const width1 = interpolate(
		prog1 + prog2,
		[0, 1, 2],
		[width, width / 2, width / 3]
	);
	const width2 = interpolate(
		prog1 + prog2,
		[0, 1, 2],
		[0, width / 2, width / 3]
	);
	const width3 = interpolate(prog2, [0, 1], [0, width / 3]);

	const left2 = interpolate(
		prog1 + prog2,
		[0, 1, 2],
		[width, width / 2, width / 3]
	);
	const left3 = interpolate(prog2, [0, 1], [width, (width / 3) * 2]);

	const disappearSpring = (delay: number) => {
		return spring({
			fps,
			frame: frame - TRANSITION_START - delay,
			config: {
				damping: 200,
			},
		});
	};

	const disappearY = (delay: number) =>
		interpolate(disappearSpring(delay), [0, 1], [0, (height / 5) * 3]);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<Sequence from={0} durationInFrames={TRANSITION_START + 40}>
				<div
					style={{
						width: width1,
						position: 'absolute',
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
						display: 'flex',
						overflow: 'hidden',
						transform: `translateY(${disappearY(0)}px)`,
					}}
				>
					<WriteInReact
						flipProgress={prog1}
						width={width1}
						flipDelay={delay1}
					/>
				</div>
				<div
					style={{
						width: width2,
						left: left2,
						position: 'absolute',
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
						display: 'flex',
						overflow: 'hidden',
						transform: `translateY(${disappearY(4)}px)`,
					}}
				>
					<PlayerExample flipProgress={prog2} delay={70} width={width2} />
				</div>
				<div
					style={{
						width: width3,
						left: left3,
						position: 'absolute',
						height: '100%',
						justifyContent: 'center',
						alignItems: 'center',
						display: 'flex',
						overflow: 'hidden',
						transform: `translateY(${disappearY(8)}px)`,
					}}
				>
					<Sequence from={200}>
						<ManySpin width={width3} flipProgress={null} />
					</Sequence>
				</div>
			</Sequence>

			<Sequence from={TRANSITION_START}>
				<AbsoluteFill
					style={{
						transform: `translateY(${interpolate(
							disappearSpring(8),
							[0, 1],
							[-height, 0]
						)}px)`,
					}}
				>
					<VideoApps />
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	);
};
