import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {Docs} from './Docs';
import {IsOnGitHub} from './IsOnGitHub';
import {WhatWillYouBuild} from './WhatWillYouBuild';

const Card: React.FC<{
	strokeWidth: number;
	color: string;
	children: React.ReactNode;
}> = ({strokeWidth, color, children}) => {
	return (
		<div
			style={{
				border: strokeWidth + 'px solid ' + color,
				flex: 1,
				borderRadius: 50,
				position: 'relative',
				overflow: 'hidden',
			}}
		>
			{children}
		</div>
	);
};

const PADDING = 50;

export const EndCard: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();

	const zoomOut = spring({
		fps,
		frame,
		config: {
			mass: 5,
			damping: 200,
		},
	});

	const scale = interpolate(zoomOut, [0, 1], [1.2, 1]);

	const prog1 = spring({
		fps,
		frame: frame - 20,
		config: {
			mass: 5,
			damping: 200,
		},
	});
	const padd1 = interpolate(prog1, [0, 0.2], [0, PADDING], {
		extrapolateRight: 'clamp',
	});
	const flex1 = interpolate(prog1, [0.2, 1], [0, 1], {
		extrapolateLeft: 'clamp',
	});
	const stroke1 = interpolate(prog1, [0.2, 0.3], [0, 10], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});
	const prog2 = spring({
		fps,
		frame: frame - 25,
		config: {
			mass: 5,

			damping: 200,
		},
	});

	const padd2 = interpolate(prog2, [0, 0.2], [0, PADDING], {
		extrapolateRight: 'clamp',
	});
	const flex2 = interpolate(prog2, [0.2, 1], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const stroke2 = interpolate(prog2, [0.2, 0.3], [0, 10], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					flex: 1,
					transform: `scale(${scale})`,
				}}
			>
				<div
					style={{
						flex: 1,
						padding: PADDING,
						display: 'flex',
					}}
				>
					<Card strokeWidth={10} color={COLORS[0]}>
						<WhatWillYouBuild />
					</Card>
				</div>
				<div
					style={{
						flex: flex1,
						flexDirection: 'column',
						display: 'flex',
					}}
				>
					<div
						style={{
							flex: 1,
							display: 'flex',
							paddingRight: padd1,
							paddingBottom: padd1,
							paddingTop: padd1,
							paddingLeft: 0,
						}}
					>
						<Card strokeWidth={stroke1} color="black">
							<Docs />
						</Card>
					</div>
					<div
						style={{
							flex: flex2,
							display: 'flex',
							paddingRight: padd2,
							paddingBottom: padd2,
							paddingTop: 0,
							paddingLeft: 0,
						}}
					>
						<Card strokeWidth={stroke2} color="black">
							<IsOnGitHub />
						</Card>
					</div>
				</div>
			</div>
		</AbsoluteFill>
	);
};
