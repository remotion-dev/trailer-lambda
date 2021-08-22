import React from 'react';
import {interpolate, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {TextStretchWord} from './TextStretchWord';

const fullWidth = 350;

export const TextStretch: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const textStretchProgressEnter = interpolate(
		Math.cos((frame / 10) % (Math.PI * 2)),
		[-1, 1],
		[0, 1]
	);

	const entry = 1;

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
				text="NAGLER"
				stretchProgress={stretching}
				weightForLetter={({letter}) => {
					if (letter === 'L') {
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
				text="WIESEN"
				stretchProgress={stretching}
				weightForLetter={({letter, nthLetter}) => {
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
				text="STRASSE"
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
			<div style={{marginTop: -40}} />

			<TextStretchWord
				fullWidth={fullWidth}
				fontSize={60}
				fontFamily="Kanit"
				text="WG-PARTY"
				stretchProgress={stretching}
				weightForLetter={({nthLetter, letter}) => {
					if (letter === 'R') {
						return textStretchProgressEnter;
					}
					if (letter === '-') {
						return 1 - textStretchProgressEnter;
					}
					return 0;
				}}
			/>
		</div>
	);
};
