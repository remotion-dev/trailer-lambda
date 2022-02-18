import React, {useState} from 'react';
import {random, useVideoConfig} from 'remotion';

export const Mask: React.FC<{
	radius: number;
	strokeWidth: number;
	color: string;
}> = ({strokeWidth, radius, color}) => {
	const {height, width} = useVideoConfig();
	const [id] = useState(() => random(null));

	return (
		<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
			<defs>
				<mask id={String(id)}>
					<rect
						mask={`url(#${id})`}
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
				mask={`url(#${id})`}
				x={0}
				y={0}
				width={width}
				height={height}
				fill={color}
			/>
		</svg>
	);
};
