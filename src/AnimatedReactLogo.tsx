import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {COLORS} from './colors';

export const AnimatedReactLogo: React.FC<{
	driver: number;
}> = ({driver}) => {
	const {height, width} = useVideoConfig();
	return (
		<>
			{new Array(3).fill(true).map((ell, i) => {
				return (
					<AbsoluteFill>
						<svg
							width={width}
							height={height}
							viewBox={`0 0 ${width} ${height}`}
							style={{
								transform: `rotate(${((i / 3) * 360 - 180) * driver}deg)`,
							}}
						>
							<ellipse
								cx={width / 2}
								cy={height / 2}
								rx={400}
								ry={140}
								stroke={COLORS[0]}
								fill="transparent"
								strokeWidth={40}
							/>
						</svg>
					</AbsoluteFill>
				);
			})}
		</>
	);
};
