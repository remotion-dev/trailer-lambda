import {Composition} from 'remotion';
import {ThreeDText} from './3DText/3DText';
import {BackgroundNoise} from './BackgroundNoise';
import {Model} from './Casette';
import {Clocks} from './Clocks';
import {Dust} from './Dust';
import {HugeOrb} from './HugeOrb';
import {Lambda} from './Lambda/Lambda';
import {Main} from './Main';
import {ManySpin} from './ManySpin';
import {MasterComp} from './MasterComp';
import {Olympia} from './Olympia/Master';
import {Party} from './Party';
import {Rollercoaster} from './Rollercoaster';
import {Rounder} from './Rounder';
import {Spin} from './Spin';
import {TextStretch} from './TextStretch';
import {Texture} from './Texture';
import {TextureAndDust} from './TextureAndDust';
import {Tunnel} from './Tunnel';

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
				id="Tunnel"
				component={Tunnel}
				durationInFrames={200}
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
				defaultProps={{
					focalPoint: [0.5, 0.5],
					backgroundColor: 'white',
				}}
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
				defaultProps={{ticketName: 'Severin Wullschleger\nLaura Fiala'}}
			/>
			<Composition
				id="Clocks"
				component={Clocks}
				durationInFrames={650}
				fps={30}
				width={1080}
				height={1080}
			/>
			<Composition
				id="Casette"
				component={Model}
				durationInFrames={100}
				fps={30}
				width={1080}
				height={1080}
			/>
			<Composition
				id="3D-Text"
				component={ThreeDText}
				durationInFrames={100}
				fps={30}
				width={1080}
				height={1080}
				defaultProps={{
					num: 10,
					scale: 2,
				}}
			/>
			<Composition
				id="rounder"
				component={Rounder}
				durationInFrames={100}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					num: 10,
					scale: 2,
				}}
			/>
			<Composition
				id="lambda"
				component={Lambda}
				durationInFrames={100}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{
					num: 10,
					scale: 2,
				}}
			/>
			<Composition
				id="Main"
				component={MasterComp}
				fps={30}
				width={1920}
				height={1080}
				durationInFrames={2400}
			/>
		</>
	);
};
