import React, {useMemo} from 'react';
import {useVideoConfig} from 'remotion';
import {COLORS} from './colors';
import {getViewBoxFromBoundingBox} from './get-viewbox-from-bounding-box';
import {useFont} from './load-font';

export const SvgText: React.FC<{
	index: number;
}> = ({children, index}) => {
	const {width} = useVideoConfig();
	const font = useFont();

	const chars = useMemo(() => {
		if (!font) {
			return null;
		}
		const path = font.getPath(children as string, 0, 0, 400, {
			yScale: 2,
		});
		return path;
	}, [children, font]);

	if (!chars) {
		return null;
	}

	return (
		<svg
			viewBox={getViewBoxFromBoundingBox(chars.getBoundingBox())}
			style={{
				height: 500,
			}}
		>
			<path fill={COLORS[0]} d={chars.toPathData(2)} />
		</svg>
	);
};
