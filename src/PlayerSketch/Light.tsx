import React, {useState} from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {AnimatedReactLogo} from '../AnimatedReactLogo';
import {COLORS} from '../colors';
import {ColorSwitcher, getColorFromFrame} from '../ColorSwitcher';
import {ensureSFProBold} from '../load-font';
import {Controls} from './Controls';

const REACT_LOGO_SCALE = 0.5;
const REACT_LOGO_START = 110;

export const Light: React.FC<{
	width: number | null;
	delay: number;
	flipProgress: number | null;
}> = ({width: originalWidth, delay, flipProgress}) => {
	const frame = useCurrentFrame();
	const {fps, width: compWidth} = useVideoConfig();
	const width = originalWidth ?? compWidth;
	const height = (width / 16) * 9;
	const PADDING = width * 0.05;
	const [sfPro] = useState(() => ensureSFProBold());

	const actualFlipProgress =
		flipProgress ??
		spring({
			fps,
			frame: frame - 50,
			config: {
				damping: 200,
			},
		});

	const progress = spring({
		fps,
		frame: frame - delay,
		config: {
			damping: 200,
		},
	});

	const scale = interpolate(progress, [0, 1], [0.6, 1]);

	const circumference = 2 * (width - PADDING * 2) + 2 * (height - PADDING * 2);

	const reactAnimation = spring({
		fps,
		frame: frame - 90,
		config: {
			damping: 200,
			mass: 6,
		},
	});

	const colorPicker = interpolate(frame, [REACT_LOGO_START, 120], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const color = getColorFromFrame(frame - REACT_LOGO_START, fps);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
				perspective: 700,
			}}
		>
			<AbsoluteFill
				style={{
					transform: `scale(${scale}) rotateY(${interpolate(
						actualFlipProgress,
						[0, 1],
						[0, -Math.PI]
					)}rad)`,
					justifyContent: 'center',
					alignItems: 'center',
					backfaceVisibility: 'hidden',
				}}
			>
				<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
					<path
						stroke="#000"
						strokeWidth={10}
						fill="transparent"
						d={`
					M ${PADDING - 5} ${PADDING}
					L ${width - PADDING} ${PADDING}
					L ${width - PADDING} ${height - PADDING}
					L ${PADDING} ${height - PADDING}
					L ${PADDING} ${PADDING}
					`}
						strokeDasharray={`${circumference} ${circumference}`}
						strokeDashoffset={(1 - progress) * circumference}
					/>
				</svg>
				<AbsoluteFill
					style={{
						transform: `translateX(${(width * (1 - REACT_LOGO_SCALE)) / 2}px)`,
					}}
				>
					<AnimatedReactLogo
						driver={reactAnimation}
						width={width * REACT_LOGO_SCALE}
						fill={color}
					/>
				</AbsoluteFill>
				<Controls
					height={height}
					padding={PADDING}
					delay={delay}
					width={width}
				/>
				<AbsoluteFill
					style={{
						transform: `scale(0.4) translateY(850px)`,
						opacity: colorPicker,
					}}
				>
					<Sequence from={REACT_LOGO_START}>
						<ColorSwitcher />
					</Sequence>
				</AbsoluteFill>
			</AbsoluteFill>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					transform: `rotateY(${interpolate(
						actualFlipProgress,
						[0, 1],
						[Math.PI, 0]
					)}rad)`,
					backfaceVisibility: 'hidden',
				}}
			>
				<h1
					style={{
						fontFamily: sfPro,
						fontSize: 80,
						color: COLORS[0],
						marginTop: 0,
						marginBottom: 0,
						fontWeight: 700,
						lineHeight: 1,
						textAlign: 'center',
					}}
				>
					Player
				</h1>
				<h2
					style={{
						fontFamily: sfPro,
						fontSize: 35,
						color: '#444',
						marginTop: 20,
						marginBottom: 0,
						fontWeight: 700,
						lineHeight: 1,
						textAlign: 'center',
					}}
				>
					Interactive videos
				</h2>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
