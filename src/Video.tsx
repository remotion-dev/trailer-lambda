import {Composition} from 'remotion';
import {BackgroundNoise} from './BackgroundNoise';
import {Main} from './Main';
import {ManySpin} from './ManySpin';
import {Rollercoaster} from './Rollercoaster';
import {Spin} from './Spin';
import {TextStretch} from './TextStretch';

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
		</>
	);
};
