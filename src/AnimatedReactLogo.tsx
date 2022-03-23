import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';

export const AnimatedReactLogo: React.FC<{
	driver: number;
	width: number | null;
	fill: string;
}> = ({driver, width: originalWidth, fill}) => {
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
								stroke={fill}
								fill="transparent"
								strokeWidth={strokeWidth}
							/>
						</svg>
					</AbsoluteFill>
				);
			})}
			<AbsoluteFill>
				<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
					<ellipse
						cx={width / 2}
						cy={height / 2}
						rx={width * 0.02}
						ry={width * 0.02}
						fill={fill}
						strokeWidth={strokeWidth}
					/>
				</svg>
			</AbsoluteFill>
		</>
	);
};
