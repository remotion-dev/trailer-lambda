import React from 'react';
import {AbsoluteFill, useVideoConfig} from 'remotion';
import {DebugSvg} from './DebugSvg';
import {makeSvgWave, svgPathToD} from './make-svg-wave';

export const Wave: React.FC = () => {
	const {width, height} = useVideoConfig();
	const path = makeSvgWave({
		width,
		height,
		numberOfCurves: 16,
		amplitude: height / 4,
		radius: 6000,
	});
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
				<path
					d={svgPathToD(path)}
					stroke="black"
					fill="transparent"
					strokeWidth={10}
				/>
				<DebugSvg path={path} />
			</svg>
		</AbsoluteFill>
	);
};
