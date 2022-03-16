import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLOR, CONTROLS_START, PLAY_START} from './const';

const Play: React.FC = () => {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			data-prefix="fas"
			data-icon="play"
			className="svg-inline--fa fa-play fa-w-14"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 448 512"
			style={{
				height: 40,
			}}
		>
			<path
				fill="currentColor"
				d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
			/>
		</svg>
	);
};

const Volume: React.FC = () => {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			data-prefix="fas"
			data-icon="volume"
			className="svg-inline--fa fa-volume fa-w-15"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 480 512"
			style={{
				height: 50,
			}}
		>
			<path
				fill="currentColor"
				d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.53 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"
			/>
		</svg>
	);
};

const Fullscreen: React.FC = () => {
	return (
		<svg
			aria-hidden="true"
			focusable="false"
			data-prefix="fas"
			data-icon="expand"
			className="svg-inline--fa fa-expand fa-w-14"
			role="img"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 448 512"
			style={{
				height: 40,
			}}
		>
			<path
				fill="currentColor"
				d="M0 180V56c0-13.3 10.7-24 24-24h124c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H64v84c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12zM288 44v40c0 6.6 5.4 12 12 12h84v84c0 6.6 5.4 12 12 12h40c6.6 0 12-5.4 12-12V56c0-13.3-10.7-24-24-24H300c-6.6 0-12 5.4-12 12zm148 276h-40c-6.6 0-12 5.4-12 12v84h-84c-6.6 0-12 5.4-12 12v40c0 6.6 5.4 12 12 12h124c13.3 0 24-10.7 24-24V332c0-6.6-5.4-12-12-12zM160 468v-40c0-6.6-5.4-12-12-12H64v-84c0-6.6-5.4-12-12-12H12c-6.6 0-12 5.4-12 12v124c0 13.3 10.7 24 24 24h124c6.6 0 12-5.4 12-12z"
			/>
		</svg>
	);
};

const Time: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const currentTime = Math.max(0, frame - PLAY_START + 20);

	const seconds = Math.floor(currentTime / fps);

	return (
		<div
			style={{
				fontFamily: 'SF Pro Display',
				fontWeight: 500,
				fontSize: 26,
			}}
		>
			0:{String(seconds).padStart(2, '0')} / 0:59
		</div>
	);
};

export const Controls: React.FC<{
	width: number | null;
	delay: number;
	padding: number;
	height: number;
}> = ({width: originalWidth, height, delay, padding}) => {
	const {fps, width: compWidth, height: compHeight} = useVideoConfig();
	const width = originalWidth ?? compWidth;
	const frame = useCurrentFrame();
	const prog = spring({
		fps,
		frame: frame - CONTROLS_START - delay,
		config: {
			damping: 200,
		},
	});

	return (
		<AbsoluteFill
			style={{
				top: 'auto',
				right: 'auto',
				bottom: padding,
				left: padding,
				padding: 45,
				paddingLeft: 50,
				paddingRight: 50,
				width: width - padding * 2,
				height: 'auto',
				alignItems: 'center',
				flexDirection: 'row',
				overflow: 'hidden',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
					width: '100%',
					marginBottom: (compHeight - height) / 2,
					alignItems: 'center',
					transform: `translateY(${interpolate(prog, [0, 1], [200, 0])}px)`,
					color: COLOR,
				}}
			>
				<Play />
				<div style={{width: 30}} />
				<Volume />
				<div style={{width: 20}} />
				<Time />
				<div style={{flex: 1}} />
				<Fullscreen />
			</div>
		</AbsoluteFill>
	);
};
