import React from 'react';
import {AbsoluteFill} from 'remotion';
import {PIECES, TimelineSplitItem} from './TimelineSplitItem';

export const TimelineSplit: React.FC = () => {
	return (
		<AbsoluteFill
			style={{
				backgroundColor: 'white',
			}}
		>
			<div
				style={{
					display: 'flex',
					flexDirection: 'row',
				}}
			>
				{new Array(PIECES).fill(true).map((_, i) => {
					return <TimelineSplitItem index={i} />;
				})}
			</div>
		</AbsoluteFill>
	);
};
