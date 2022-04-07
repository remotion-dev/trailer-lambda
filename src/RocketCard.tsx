import React from 'react';
import {AbsoluteFill} from 'remotion';
import {Checklist} from './Checklist';
import {Rockets} from './Rockets';

export const RocketCard: React.FC<{
	showRockets: boolean;
}> = ({showRockets = true}) => {
	return (
		<AbsoluteFill>
			{showRockets ? (
				<AbsoluteFill>
					<Rockets />
				</AbsoluteFill>
			) : null}
			<AbsoluteFill>
				<Checklist />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
