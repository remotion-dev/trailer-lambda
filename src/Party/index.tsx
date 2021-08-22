import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, Video} from 'remotion';
import {Dust} from '../Dust';
import {TextStretch} from '../TextStretch';
import {Texture} from '../Texture';
import bahnhof from './bahnhof.png';
import date from './date.png';
import invited from './invited.png';
import music from './music.mp3';
import party from './party.mp4';

export const Party: React.FC = () => {
	return (
		<AbsoluteFill>
			<Video src={party} />
			<AbsoluteFill style={{opacity: 0.4}}>
				<Texture
					color1="rgba(255, 0, 0, 0.5)"
					color2="rgba(255, 255, 255, 0.5)"
				/>
				<Texture
					color1="rgba(0, 255, 0, 0.5)"
					color2="rgba(255, 255, 255, 0.5)"
				/>
				<Texture
					color1="rgba(0, 0, 255, 0.5)"
					color2="rgba(255, 255, 255, 0.5)"
				/>
				<Texture
					color1="rgba(255, 255, 0, 0.5)"
					color2="rgba(255, 255, 255, 0.5)"
				/>
			</AbsoluteFill>
			<AbsoluteFill style={{opacity: 0.14}}>
				<Dust />
			</AbsoluteFill>

			<Sequence from={0} durationInFrames={67}>
				<AbsoluteFill style={{}}>
					<Img src={invited} />
				</AbsoluteFill>
			</Sequence>
			<Sequence from={67} durationInFrames={150 - 67}>
				<AbsoluteFill
					style={{
						transform: `scale(2)`,
					}}
				>
					<TextStretch />
				</AbsoluteFill>
			</Sequence>
			<Sequence from={150} durationInFrames={63}>
				<AbsoluteFill>
					<Img src={date} />
				</AbsoluteFill>
			</Sequence>
			<Sequence from={213} durationInFrames={63}>
				<AbsoluteFill>
					<Img src={bahnhof} />
				</AbsoluteFill>
			</Sequence>
			<Audio src={music} startFrom={70 * 30} />
		</AbsoluteFill>
	);
};
