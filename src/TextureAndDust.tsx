import {AbsoluteFill} from 'remotion';
import {Dust} from './Dust';
import {TextStretch} from './TextStretch';
import {Texture} from './Texture';

export const TextureAndDust: React.FC = () => {
	return (
		<AbsoluteFill style={{backgroundColor: 'white'}}>
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
			<Dust />
			<AbsoluteFill style={{transform: `scale(2)`}}>
				<TextStretch />
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
