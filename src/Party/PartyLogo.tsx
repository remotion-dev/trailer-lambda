import React from 'react';
import {AbsoluteFill} from 'remotion';
import {TextStretch} from '../TextStretch';

export const PartyLogo: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				transform: `scale(1.5)`,
			}}
		>
			<TextStretch />
		</AbsoluteFill>
	);
};
