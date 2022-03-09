export const PADDING = 100;
export const CONTROLS_START = 10;
export const PLAY_START = 100;
export const COLOR = '#0B84F3';

export type Theme = 'light' | 'dark';

export const BACKGROUND = (theme: Theme) =>
	theme === 'light' ? 'white' : 'rgb(24, 25, 26)';
export const FOREGROUND = (theme: Theme) =>
	theme === 'light' ? 'black' : 'white';
