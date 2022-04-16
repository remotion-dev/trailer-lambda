import React, {useState} from 'react';
import {AbsoluteFill, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {COLORS} from './colors';
import {ensureSFProHeavyItalic} from './load-font';

export const NpmInstallVideo: React.FC<{
	background: string;
}> = ({background}) => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const [sfPro] = useState(() => ensureSFProHeavyItalic());
	const scale = (delay: number) =>
		spring({
			fps,
			frame: frame - delay,
			config: {
				damping: 200,
			},
		});

	const blink = Math.round(frame / 30) % 2 === 1 ? 1 : 0;
	return (
		<AbsoluteFill
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: background,
			}}
		>
			<div
				style={{
					fontFamily: sfPro,
					fontSize: '8em',
					fontWeight: 900,
					color: COLORS[0],
					fontStyle: 'italic',
				}}
			>
				<span
					style={{
						display: 'inline-block',
						whiteSpace: 'pre',
						transform: `scale(${scale(0)})`,
					}}
				>
					npm{' '}
				</span>
				<span
					style={{
						display: 'inline-block',
						whiteSpace: 'pre',
						transform: `scale(${scale(4)})`,
					}}
				>
					i{' '}
				</span>
				<span
					style={{
						whiteSpace: 'pre',
						display: 'inline-block',
						transform: `scale(${scale(7)})`,
					}}
				>
					@remotion/
				</span>
				<span
					style={{
						whiteSpace: 'pre',
						display: 'inline-block',
						transform: `scale(${scale(10)})`,
					}}
				>
					lambda
					<span
						style={{
							opacity: blink,
						}}
					>
						_
					</span>
				</span>
			</div>
		</AbsoluteFill>
	);
};
