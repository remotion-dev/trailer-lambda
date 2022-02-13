import React from 'react';

export const OpenTypeNumber: React.FC<{
	box: opentype.BoundingBox;
	path: string;
}> = ({box, path}) => {
	const viewBox = `${box.x1} ${box.y1} ${box.x2 - box.x1} ${box.y2 - box.y1}`;
	return (
		<svg viewBox={viewBox}>
			<path d={path} fill="red" />
		</svg>
	);
};
