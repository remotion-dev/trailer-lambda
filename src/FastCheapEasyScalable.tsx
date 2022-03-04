import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Cheap} from './Cheap';
import {Easy} from './Easy';
import {Fast} from './Fast';
import {Scalable} from './Scalable';

export const FastCheapEasyScalable: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width} = useVideoConfig();

	const prog1 = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});

	const prog2 = spring({
		fps,
		frame: frame - 20,
		config: {
			damping: 200,
		},
	});

	const prog3 = spring({
		fps,
		frame: frame - 40,
		config: {
			damping: 200,
		},
	});

	const width1 = interpolate(
		prog1 + prog2 + prog3,
		[0, 1, 2, 3],
		[width, width / 2, width / 3, width / 4]
	);
	const width2 = interpolate(
		prog1 + prog2 + prog3,
		[0, 1, 2, 3],
		[0, width / 2, width / 3, width / 4]
	);
	const width3 = interpolate(
		prog2 + prog3,
		[0, 1, 2],
		[0, width / 3, width / 4]
	);
	const width4 = interpolate(prog3, [0, 1], [0, width / 4]);

	const left2 = interpolate(
		prog1 + prog2 + prog3,
		[0, 1, 2, 3],
		[width, width / 2, width / 3, width / 4]
	);
	const left3 = interpolate(
		prog2 + prog3,
		[0, 1, 2],
		[width, (width / 3) * 2, (width / 4) * 2]
	);
	const left4 = interpolate(prog3, [0, 1], [width, (width / 4) * 3]);

	return (
		<AbsoluteFill>
			<div
				style={{
					width: width1,
					position: 'absolute',
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
				}}
			>
				<Fast />
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
				}}
			>
				<Scalable />
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
				}}
			>
				<Cheap />
			</div>
			<div
				style={{
					width: width4,
					left: left4,
					position: 'absolute',
					height: '100%',
					justifyContent: 'center',
					alignItems: 'center',
					display: 'flex',
					overflow: 'hidden',
				}}
			>
				<Easy />
			</div>
		</AbsoluteFill>
	);
};
