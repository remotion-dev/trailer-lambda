import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {TextStretchWord} from './TextStretchWord';

const fullWidth = 300;

export const TextStretch: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const textStretchProgressEnter = interpolate(
		Math.cos((frame / 10) % (Math.PI * 2)),
		[-1, 1],
		[0, 1]
	);

	const entry = spring({
		frame: frame - 40,
		fps,
		config: {
			damping: 200,
		},
	});

	const fadeOut = spring({
		frame: frame - (durationInFrames - 40),
		fps,
		config: {
			damping: 200,
		},
	});

	const stretching = entry * (1 - fadeOut);

	return (
		<div
			style={{
				justifyContent: 'center',
				display: 'flex',
				alignItems: 'center',
				flexDirection: 'column',
				flex: 1,
			}}
		>
			<TextStretchWord
				fullWidth={fullWidth}
				fontSize={60}
				fontFamily="Kanit"
				text="TEXT"
				stretchProgress={stretching}
				weightForLetter={({letter}) => {
					if (letter === 'T') {
						return 1 - textStretchProgressEnter;
					}
					if (letter === 'E') {
						return textStretchProgressEnter;
					}
					return 0;
				}}
			/>
			<div style={{marginTop: -40}} />
			<TextStretchWord
				fullWidth={fullWidth}
				fontSize={60}
				fontFamily="Kanit"
				text="STRETCH"
				stretchProgress={stretching}
				weightForLetter={({letter, nthLetter}) => {
					if (letter === 'T') {
						return textStretchProgressEnter;
					}
					if (nthLetter === 6) {
						return textStretchProgressEnter;
					}
					if (letter === 'E') {
						return 1 - textStretchProgressEnter;
					}
					return 0;
				}}
			/>
			<div style={{marginTop: -40}} />

			<TextStretchWord
				fullWidth={fullWidth}
				fontSize={60}
				fontFamily="Kanit"
				text="EFFECT"
				stretchProgress={stretching}
				weightForLetter={({nthLetter, letter}) => {
					if (nthLetter === 1) {
						return textStretchProgressEnter;
					}
					if (nthLetter === 2) {
						return 1 - textStretchProgressEnter;
					}
					return 0;
				}}
			/>
		</div>
	);
};
