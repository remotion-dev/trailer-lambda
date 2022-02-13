// Lambdas hugging the starting number

import {interpolate, spring} from 'remotion';
import {VIDEO_FPS} from './fps';

export const HUG_START = 0;

export const getHugProgress = (frame: number) => {
	return spring({
		fps: VIDEO_FPS,
		frame: frame - HUG_START,
		config: {
			damping: 200,
		},
	});
};

export const getLambdaHoleSize = (frame: number) => {
	return interpolate(getHugProgress(frame), [0, 1], [4700, 500]);
};
