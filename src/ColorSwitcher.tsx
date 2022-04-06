import React from 'react';
import {
	AbsoluteFill,
	interpolateColors,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLOR} from './PlayerSketch/const';

const colors = [COLOR, '#48dbfb', '#70a1ff'];

const SIZE = 200;
const PADDING = 50;

const circle: React.CSSProperties = {
	width: SIZE,
	height: SIZE,
	marginLeft: PADDING,
	marginRight: PADDING,
};

const getPosFromFrame = (frame: number, fps: number) => {
	const prog1 = spring({
		fps,
		frame: frame - 15,
		config: {
			damping: 200,
		},
	});
	const prog2 = spring({
		fps,
		frame: frame - 40,
		config: {
			damping: 200,
		},
	});
	const pos = prog1 + prog2;
	return pos;
};

export const getColorFromFrame = (frame: number, fps: number) => {
	return interpolateColors(
		getPosFromFrame(frame, fps),
		colors.map((c, i) => i),
		colors
	);
};

export const ColorSwitcher: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const pos = getPosFromFrame(frame, fps);
	const fromMiddle = pos - colors.length / 2 + 0.5;

	const x = fromMiddle * (SIZE + PADDING * 2);
	return (
		<AbsoluteFill>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'row',
				}}
			>
				<div
					style={{
						backgroundColor: 'white',
						boxShadow: '0 0 50px rgba(0, 0, 0, 0.2)',
						width: SIZE * 1.4,
						height: SIZE * 1.4,
						borderRadius: (SIZE * 1.4) / 2,
						transform: `translateX(${x}px)`,
					}}
				/>
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'row',
				}}
			>
				{colors.map((c) => {
					return (
						<div
							key={c}
							style={{...circle, backgroundColor: c, borderRadius: SIZE / 2}}
						/>
					);
				})}
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
