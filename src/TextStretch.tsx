import React, {useRef} from 'react';
import {useVideoConfig} from 'remotion';
import './styles.css';
import {TextStretchWord} from './TextStretchWord';

const fullWidth = 400;
const textHeight = 100;

export const TextStretch: React.FC = () => {
	const ref = useRef<HTMLCanvasElement>(null);
	const {width, height} = useVideoConfig();

	return (
		<div>
			<canvas
				ref={ref}
				width={width}
				height={height}
				style={{backgroundColor: 'white'}}
			/>
			<TextStretchWord
				alternate
				canvas={ref}
				fullWidth={fullWidth}
				textHeight={textHeight}
				text="TEXT"
				left={100}
				top={100}
				range2={() => [65, 68]}
				range1={() => [1, 4]}
				delay={0}
			/>
			<TextStretchWord
				alternate
				canvas={ref}
				fullWidth={fullWidth}
				textHeight={textHeight}
				text="STRETCH"
				left={100}
				top={190}
				range1={() => [45, 46]}
				range2={() => [160, 161]}
				delay={5}
			/>
			<TextStretchWord
				canvas={ref}
				fullWidth={fullWidth}
				textHeight={textHeight}
				text="EFFECT"
				left={100}
				top={280}
				range1={() => [65, 68]}
				range2={() => [160, 161]}
				alternate={false}
				delay={10}
			/>
		</div>
	);
};
