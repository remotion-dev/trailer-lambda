import {Gif} from '@remotion/gif';
import React from 'react';
import {AbsoluteFill, random, useCurrentFrame, useVideoConfig} from 'remotion';

export const Clocks: React.FC = () => {
	const {height, width} = useVideoConfig();
	const frame = useCurrentFrame();
	const seed = Math.floor(frame / 8);
	return (
		<AbsoluteFill style={{display: 'block'}}>
			{new Array(25).fill(true).map((_, i) => {
				const isVisible = random(String(i) + seed) - 0.6;
				const randomOffsetX = random(seed + 'offset' + i) * 100 - 50;
				const randomOffsetY = random(seed + 'offsety' + i) * 100 - 50;
				const randomRotation = random(seed + 'rotation' + i) * 360;
				const randomScale = random(seed + 'scale' + i);
				return (
					<div
						style={{display: 'inline', height: height / 5, width: width / 5}}
					>
						<Gif
							style={{
								display: 'inline',
								height: height / 5,
								width: width / 5,
								opacity: isVisible,
								transform: `rotate(${randomRotation}deg) scale(${randomScale}) translateX(${randomOffsetX}px) translateY(${randomOffsetY}px)`,
							}}
							src="https://upload.wikimedia.org/wikipedia/de/7/7c/Minutensprunguhr_animiert.gif"
						/>
					</div>
				);
			})}
		</AbsoluteFill>
	);
};
