import React from 'react';
import {useVideoConfig} from 'remotion';

export const Mask: React.FC<{
	radius: number;
	strokeWidth: number;
}> = ({strokeWidth, radius}) => {
	const {height, width} = useVideoConfig();

	return (
		<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
			<defs>
				<mask id="mask">
					<rect
						mask="url(#mask)"
						x={0}
						y={0}
						width={width}
						height={height}
						fill="white"
					/>
					<circle
						cx={width / 2}
						cy={height / 2}
						r={radius}
						strokeWidth={strokeWidth}
					/>
				</mask>
			</defs>
			<rect
				mask="url(#mask)"
				x={0}
				y={0}
				width={width}
				height={height}
				fill="white"
			/>
		</svg>
	);
};
