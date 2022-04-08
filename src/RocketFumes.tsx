import React, {useMemo} from 'react';
import {
	AbsoluteFill,
	interpolateColors,
	random,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import SimplexNoise from 'simplex-noise';
import {COLORS} from './colors';

const fumeCount = 150;

export const RocketFumes: React.FC<{
	estinguishProgress: number;
}> = ({estinguishProgress}) => {
	const frame = useCurrentFrame();
	const {width} = useVideoConfig();

	const noise = useMemo(() => {
		return new Array(fumeCount).fill(true).map((_, i) => {
			return {
				x: new SimplexNoise('noiseoffsetx' + i),
				y: new SimplexNoise('noiseoffsety' + i),
			};
		});
	}, []);

	return (
		<AbsoluteFill>
			{new Array(fumeCount).fill(true).map((fume, i) => {
				const noiseX = noise[i].x.noise2D(0, frame / 10) * 20;
				const noiseY = noise[i].y.noise2D(0, frame / 10) * 100;
				const size =
					(1 - estinguishProgress) * (random('size' + i) * 100 + 200);
				const xOffset = (random('xoffset' + i) - 0.5) * 400 + noiseX;
				const yOffset = (random('yoffset' + i) - 0.5) * 800 + noiseY + 400;
				const color = interpolateColors(
					i,
					[-fumeCount, fumeCount * 2],
					[COLORS[0], '#fff']
				);

				return (
					<AbsoluteFill
						style={{
							height: size,
							width: size,
							left: width / 2 - size / 2 + xOffset,
							top: 1200 + yOffset,
							borderRadius: size / 2,
							backgroundColor: color,
						}}
					/>
				);
			})}
		</AbsoluteFill>
	);
};
