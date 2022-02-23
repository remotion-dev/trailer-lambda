import {
	getHugAndRetreatProgress,
	NUMBER_OF_WAVES,
	WAVES_START,
	WAVE_EVERY_FRAMES,
} from './waves';

const START_NUMBER = 60;

export const numberToDisplay = (frame: number) => {
	if (frame < WAVES_START) {
		return 60;
	}
	const framesSinceWavesStart = frame - WAVES_START - WAVE_EVERY_FRAMES / 2;
	const wavesPassed = Math.min(
		NUMBER_OF_WAVES / 2,
		Math.round((framesSinceWavesStart + 5) / WAVE_EVERY_FRAMES / 2)
	);

	return START_NUMBER - wavesPassed * 5;
};

export const getNumbersize = (frame: number) => {
	return getHugAndRetreatProgress(frame);
};
