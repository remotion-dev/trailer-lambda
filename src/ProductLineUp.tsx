import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Cheap} from './Cheap';
import {Fast} from './Fast';
import {Scalable} from './Scalable';

export const ProductLineUp: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, width} = useVideoConfig();

	const prog1 = spring({
		fps,
		frame: frame - 30,
		config: {
			damping: 200,
		},
	});

	const prog2 = spring({
		fps,
		frame: frame - 60,
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
					overflow: 'hidden',
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
				<Cheap width={width3} />
			</div>
		</AbsoluteFill>
	);
};
