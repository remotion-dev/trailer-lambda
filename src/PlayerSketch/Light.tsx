import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {BACKGROUND, COLOR, PADDING, Theme} from './const';
import {Controls} from './Controls';

export const Light: React.FC<{
	theme: Theme;
}> = ({theme}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const progress = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});

	const scale = interpolate(progress, [0, 1], [0.6, 1]);

	const circumference = 2 * (1280 - PADDING * 2) + 2 * (720 - PADDING * 2);

	return (
		<AbsoluteFill
			style={{
				backgroundColor: BACKGROUND(theme),
			}}
		>
			<AbsoluteFill
				style={{
					transform: `scale(${scale})`,
				}}
			>
				<svg width={1280} height={720} viewBox="0 0 1280 720">
					<path
						stroke={COLOR}
						strokeWidth={10}
						fill="none"
						d={`
					M ${PADDING} ${PADDING}
					L ${1280 - PADDING} ${PADDING}
					L ${1280 - PADDING} ${720 - PADDING}
					L ${PADDING} ${720 - PADDING}
					z
					`}
						strokeDasharray={`${circumference} ${circumference}`}
						strokeDashoffset={(1 - progress) * circumference}
					/>
				</svg>
				<Controls theme={theme} />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
