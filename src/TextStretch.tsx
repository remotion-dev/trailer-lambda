import React from 'react';
import {TextStretchWord} from './TextStretchWord';

const fullWidth = 600;

export const TextStretch: React.FC = () => {
	return (
		<div>
			<TextStretchWord
				fullWidth={fullWidth}
				fontSize={60}
				fontFamily="Kanit"
				text="TEXT"
				stretchProgress={1}
			/>
			<TextStretchWord
				fullWidth={fullWidth}
				fontSize={60}
				fontFamily="Kanit"
				text="STRETCH"
				stretchProgress={1}
			/>
			<TextStretchWord
				fullWidth={fullWidth}
				fontSize={60}
				fontFamily="Kanit"
				text="EFFECT"
				stretchProgress={1}
			/>
		</div>
	);
};
