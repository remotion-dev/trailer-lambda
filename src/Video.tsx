import {Composition} from 'remotion';
import {BackgroundNoise} from './BackgroundNoise';
import {Clocks} from './Clocks';
import {Dust} from './Dust';
import {HugeOrb} from './HugeOrb';
import {Main} from './Main';
import {ManySpin} from './ManySpin';
import {Olympia} from './Olympia/Master';
import {Party} from './Party';
import {Rollercoaster} from './Rollercoaster';
import {Spin} from './Spin';
import {TextStretch} from './TextStretch';
import {Texture} from './Texture';
import {TextureAndDust} from './TextureAndDust';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="HelloWorld"
				component={Main}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			<Composition
				id="Noise"
				component={BackgroundNoise}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			<Composition
				id="Spin"
				component={Spin}
				durationInFrames={150}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					seed: '0',
				}}
			/>
			<Composition
				id="ManySpin"
				component={ManySpin}
				durationInFrames={300}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					seed: '0',
				}}
			/>
			<Composition
				id="Rollercoaster"
				component={Rollercoaster}
				durationInFrames={900}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="TextStretch"
				component={TextStretch}
				durationInFrames={180}
				fps={30}
				width={600}
				height={470}
			/>
			<Composition
				id="Olympia"
				component={Olympia}
				durationInFrames={180}
				fps={30}
				width={1280}
				height={720}
			/>
			<Composition
				id="HugeOrb"
				component={HugeOrb}
				durationInFrames={180}
				fps={30}
				width={1280}
				height={720}
			/>
			<Composition
				id="Texture"
				component={Texture}
				durationInFrames={180}
				fps={30}
				width={1280}
				height={720}
			/>
			<Composition
				id="Dust"
				component={Dust}
				durationInFrames={180}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="TextureAndDust"
				component={TextureAndDust}
				durationInFrames={180}
				fps={30}
				width={1920}
				height={1080}
			/>
			<Composition
				id="Party"
				component={Party}
				durationInFrames={500}
				fps={30}
				width={1080}
				height={1080}
			/>
			<Composition
				id="Clocks"
				component={Clocks}
				durationInFrames={500}
				fps={30}
				width={1080}
				height={1080}
			/>
		</>
	);
};
