import React from 'react';
import {TextStretchWord} from './TextStretchWord';

const fullWidth = 400;

export const TextStretch: React.FC = () => {
	return (
		<div>
			<TextStretchWord
				alternate
				fullWidth={fullWidth}
				fontSize={60}
				fontFamily="Kanit"
				text="TEXT"
				delay={0}
			/>
			<br />
			<TextStretchWord
				alternate
				fullWidth={fullWidth}
				fontSize={60}
				fontFamily="Kanit"
				text="STRETCH"
				delay={0}
			/>
			<br />
			<TextStretchWord
				alternate
				fullWidth={fullWidth}
				fontSize={60}
				fontFamily="Kanit"
				text="EFFECT"
				delay={0}
			/>
		</div>
	);
};
