import React from 'react';
import {
	AbsoluteFill,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {HugeOrb} from './HugeOrb';

const orbs = 40;

export const ManyOrbs: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	return (
		<AbsoluteFill>
			{new Array(orbs).fill(true).map((orb, i) => {
				const scale =
					spring({
						fps,
						frame: frame - i * 10,
						config: {
							damping: 200,
							mass: 100,
						},
					}) * 3;
				return (
					<Sequence from={10 * i}>
						<AbsoluteFill
							style={{
								position: 'absolute',
								transform: `scale(${scale}) rotate(${
									((Math.PI * 2) / orbs) * i
								}rad)`,
							}}
						>
							<HugeOrb />
						</AbsoluteFill>
					</Sequence>
				);
			})}
		</AbsoluteFill>
	);
};
