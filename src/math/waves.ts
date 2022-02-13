import {interpolate} from 'remotion';
import {getHugProgress, HUG_START} from './start-hug';

export const WAVE_EVERY_FRAMES = 10;

export const WAVES_START = 40 + HUG_START;
export const NUMBER_OF_WAVES = 8;

export const getHugAndRetreatProgress = (frame: number) => {
	const small = 0.4;

	const hugProgress = interpolate(getHugProgress(frame), [0, 1], [1, small]);
	const retreat = interpolate(
		frame,
		[WAVES_START + 5, WAVES_START + WAVE_EVERY_FRAMES * NUMBER_OF_WAVES],
		[0, 1 - small],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return retreat + hugProgress;
};
