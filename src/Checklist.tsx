import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {GreekLetter} from './Lambda/GreekLetter';

const width = 550;
const height = 800;

const bubbleSize = 70;

const fast: React.CSSProperties = {
	color: 'black',
	fontSize: 70,
	fontFamily: 'SF Pro',
	fontWeight: 'bold',
	marginTop: 15,
	marginBottom: 15,
};

const bubble: React.CSSProperties = {
	height: bubbleSize,
	width: bubbleSize,
	borderRadius: bubbleSize / 2,
	backgroundColor: COLORS[0],
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

const Bubble: React.FC<{
	delay: number;
}> = ({delay}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const scale = spring({
		fps,
		frame: frame - delay - 10,
		config: {
			damping: 200,
			mass: 0.3,
		},
	});
	return (
		<div style={{...bubble, transform: `scale(${scale})`}}>
			<svg
				style={{
					height: 40,
				}}
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 512 512"
			>
				<path
					fill="white"
					d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
				/>
			</svg>
		</div>
	);
};

const Row: React.FC<{
	label: string;
	delay: number;
}> = ({delay, label}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const moveUp = spring({
		fps,
		frame: frame - delay,
		config: {
			damping: 200,
		},
	});
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'row',
				alignItems: 'center',
				transform: `translateY(${interpolate(moveUp, [0, 1], [600, 0])}px)`,
			}}
		>
			<Bubble delay={delay} />
			<div style={{width: 30}} />
			<div
				style={{
					...fast,
				}}
			>
				{label}
			</div>
		</div>
	);
};

export const Checklist: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
			}}
		>
			<div
				style={{
					width,
					height,
					border: '10px solid black',
					borderRadius: 50,
					backgroundColor: 'white',
					padding: 50,
					paddingTop: 20,
					overflow: 'hidden',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						justifyContent: 'center',
						paddingTop: 20,
						paddingBottom: 20,
					}}
				>
					<GreekLetter alternate color={COLORS[0]} height={100} width={50} />
				</div>
				<Row delay={0} label="Fast" />
				<Row delay={10} label="Scalable" />
				<Row delay={20} label="Cheap" />
				<Row delay={30} label="Easy" />
			</div>
		</AbsoluteFill>
	);
};
