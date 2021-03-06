import React, {useState} from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {ensureSFProHeavyItalic} from './load-font';
import {remapSpeed} from './remap-speed';

export const WayTooSlow: React.FC = () => {
	const frame = useCurrentFrame();
	const [sfProItalic] = useState(() => ensureSFProHeavyItalic());

	const remappedFrame = remapSpeed({
		frame,
		speed: (f) => interpolate(f, [0, 30], [3, 0]),
	});

	const {fps} = useVideoConfig();
	const progress = (delay: number) =>
		spring({
			fps,
			frame: remappedFrame - delay,
			config: {
				damping: 200,
				mass: 4,
			},
		});

	return (
		<AbsoluteFill>
			<AbsoluteFill
				style={{
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<h1
					style={{
						fontFamily: sfProItalic,
						fontSize: 280,
						color: COLORS[0],
						marginTop: 0,
						marginBottom: 0,
						fontWeight: 900,
						lineHeight: 1,
						textAlign: 'center',
					}}
				>
					<span
						style={{
							display: 'inline-block',
							transform: `scale(${progress(0)})`,
						}}
					>
						way
					</span>
					<span
						style={{
							whiteSpace: 'pre',
						}}
					>
						{' '}
					</span>
					<span
						style={{
							display: 'inline-block',
							transform: `scale(${progress(10)})`,
						}}
					>
						too
					</span>
					<span
						style={{
							whiteSpace: 'pre',
						}}
					>
						{' '}
					</span>
					<span
						style={{
							display: 'inline-block',
							transform: `scale(${progress(20)})`,
						}}
					>
						slow
					</span>
				</h1>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
