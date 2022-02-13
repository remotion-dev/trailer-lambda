import {interpolate} from 'remotion';
import {getHugProgress} from './start-hug';
import {WAVES_START, WAVE_EVERY_FRAMES} from './waves';

const START_NUMBER = 60;

export const numberToDisplay = (frame: number) => {
	if (frame < WAVES_START) {
		return 60;
	}
	const framesSinceWavesStart = frame - WAVES_START - WAVE_EVERY_FRAMES / 2;
	const wavesPassed = Math.ceil(framesSinceWavesStart / WAVE_EVERY_FRAMES / 2);

	return START_NUMBER - wavesPassed;
};

export const getNumbersize = (frame: number) => {
	return interpolate(getHugProgress(frame), [0, 1], [1, 0.4]);
};
