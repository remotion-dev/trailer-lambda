import React from 'react';
import {AbsoluteFill, random, Sequence} from 'remotion';
import {Spin} from './Spin';

export const ManySpin: React.FC = () => {
	return (
		<AbsoluteFill>
			<AbsoluteFill
				style={{
					backgroundColor: 'white',
				}}
			/>
			{new Array(30).fill(1).map((_, i) => {
				return (
					<Sequence
						key={String(i)}
						from={parseInt(String(random(i) * 100), 10)}
					>
						<Spin seed={String(i)} />;
					</Sequence>
				);
			})}
		</AbsoluteFill>
	);
};
