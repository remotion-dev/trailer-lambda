import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {COLORS} from './colors';
import {Cursor} from './Cursor';

export const WriteInReact: React.FC = () => {
	const {width, height} = useVideoConfig();

	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			{new Array(3).fill(true).map((ell, i) => {
				return (
					<AbsoluteFill>
						<svg
							width={width}
							height={height}
							viewBox={`0 0 ${width} ${height}`}
							style={{transform: `rotate(${(i / 3) * 360}deg)`}}
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
			<Cursor />
		</AbsoluteFill>
	);
};
