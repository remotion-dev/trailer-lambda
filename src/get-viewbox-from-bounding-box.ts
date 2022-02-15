import {BoundingBox} from 'opentype.js';

export const getViewBoxFromBoundingBox = (box: BoundingBox) => {
	return `${box.x1} ${box.y1} ${box.x2 - box.x1} ${box.y2 - box.y1}`;
};
