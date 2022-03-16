import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {COLORS} from './colors';

export const AnimatedReactLogo: React.FC<{
	driver: number;
	width: number | null;
}> = ({driver, width: originalWidth}) => {
	const {height, width: compWidth} = useVideoConfig();
	const width = originalWidth ?? compWidth;
	const rx = width * 0.2;
	const ry = (rx / 400) * 140;
	const strokeWidth = width * 0.025;

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
								rx={rx}
								ry={ry}
								stroke={COLORS[0]}
								fill="transparent"
								strokeWidth={strokeWidth}
							/>
						</svg>
					</AbsoluteFill>
				);
			})}
		</>
	);
};
