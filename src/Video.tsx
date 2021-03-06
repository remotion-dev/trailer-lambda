import {Composition, Still} from 'remotion';
import {Checklist} from './Checklist';
import {ColorSwitcher} from './ColorSwitcher';
import {Cursor} from './Cursor';
import {Curtain} from './Curtain';
import {Elevator} from './Elevator';
import {EndCard} from './EndCard';
import {FlatCasette} from './FlatCasette';
import {Free} from './Free';
import {Hype} from './Hype';
import {HypeCircles} from './HypeCircles';
import {HypeDate} from './HypeDate';
import {HypeLogo} from './HypeLogo';
import {HypeTrailer} from './HypeTrailer';
import {IsSlow} from './IsSlow';
import {Lambda} from './Lambda/Lambda';
import {Cluster} from './LambdaCluster';
import {LambdaVis} from './LambdaVis';
import {Main} from './Main';
import {ManySpin} from './ManySpin';
import {VIDEO_FPS} from './math/fps';
import {NormallyTakes} from './NormallyTakes';
import {NormallyTakesMultiplied} from './NormallyTakesMultiplied';
import {NpmInstallVideo} from './NpmInstall';
import {BigNum} from './Number';
import {Paid} from './Paid';
import {Pitch} from './Pitch';
import {PlayerExample} from './PlayerExample';
import {Pricing} from './Pricing';
import {PricingToSourceAvailable} from './PricingToSourceAvailable';
import {ProductLineUp} from './ProductLineUp';
import {RocketCard} from './RocketCard';
import {Rockets} from './Rockets';
import {RocketShip} from './RocketShip';
import {SourceAvailable} from './SourceAvailable';
import {SpaceDust} from './SpaceDust';
import {StarryNumber} from './StarryNumber';
import {StarryNumbers} from './StarryNumbers';
import {ThisVideo} from './ThisVideo';
import {TimelineSplit} from './TimelineSplit';
import {Tunnel} from './Tunnel';
import {TunnelMask} from './TunnelMask';
import {Upwind} from './Upwind';
import {VideoApps} from './VideoApps';
import {Vis} from './Vis';
import {ManyWaves} from './Wave';
import {WayTooSlow} from './WayTooSlow';
import {WhatWillYouBuild} from './WhatWillYouBuild';
import {WheelTransitionIn, WheelTransitionOut} from './WheelTransitionDemo';
import {WriteInReact} from './WriteInReact';
import {WriteInReactHomepage} from './WriteInReactHomepage';

export const RemotionVideo: React.FC = () => {
	return (
		<>
			<Composition
				id="Main"
				component={Main}
				fps={VIDEO_FPS}
				width={1920}
				height={1080}
				durationInFrames={2400}
			/>

			<Composition
				id="Rockets"
				component={Rockets}
				durationInFrames={150}
				fps={VIDEO_FPS}
				width={1920}
				height={1080}
				defaultProps={{
					titleText: 'Welcome to Remotion',
					titleColor: 'black',
				}}
			/>
			<Composition
				id="ManySpin"
				component={ManySpin}
				durationInFrames={300}
				fps={VIDEO_FPS}
				width={1920}
				height={1080}
				defaultProps={{
					width: null,
					flipProgress: 0,
				}}
			/>
			<Composition
				id="Tunnel"
				component={Tunnel}
				durationInFrames={400}
				fps={VIDEO_FPS}
				width={1920}
				height={1080}
			/>
			<Composition
				id="ThisVideo"
				component={ThisVideo}
				durationInFrames={90}
				fps={VIDEO_FPS}
				width={1920}
				height={1080}
				defaultProps={{
					frameNum: 0,
					showSpecs: true,
				}}
			/>

			<Composition
				id="lambda"
				component={Lambda}
				durationInFrames={100}
				fps={VIDEO_FPS}
				width={1920}
				height={1080}
				defaultProps={{
					num: 10,
					scale: 2,
				}}
			/>
			<Composition
				id="Vis"
				component={Vis}
				fps={VIDEO_FPS}
				width={1920}
				height={1080}
				durationInFrames={1100}
			/>
			<Composition
				id="Wave"
				component={ManyWaves}
				fps={VIDEO_FPS}
				width={1920}
				height={1080}
				durationInFrames={2400}
			/>
			<Composition
				id="Elevator"
				component={Elevator}
				fps={VIDEO_FPS}
				width={1920}
				height={1080}
				durationInFrames={2400}
			/>
			<Composition
				id="IsSlow"
				component={IsSlow}
				fps={VIDEO_FPS}
				width={1920}
				height={1080}
				durationInFrames={200}
			/>
			<Composition
				id="StarryNumber"
				component={StarryNumber}
				fps={VIDEO_FPS}
				width={1920}
				height={1080}
				durationInFrames={65}
				defaultProps={{
					from: '30',
					to: '29',
				}}
			/>
			<Composition
				id="StarryNumbers"
				component={StarryNumbers}
				fps={VIDEO_FPS}
				width={1920}
				height={1080}
				durationInFrames={250}
			/>
			<Composition
				id="RocketShip"
				component={RocketShip}
				fps={VIDEO_FPS}
				width={1920}
				height={1080}
				durationInFrames={2400}
			/>
			<Still
				defaultProps={{
					number: '60',
				}}
				id="BigNum"
				component={BigNum}
				width={1920}
				height={1080}
			/>
			<Composition
				id="Upwind"
				component={Upwind}
				durationInFrames={150}
				height={1080}
				width={1920}
				fps={VIDEO_FPS}
			/>
			<Composition
				id="TimelineSplit"
				component={TimelineSplit}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={VIDEO_FPS}
			/>
			<Still
				id="FlatCasette"
				component={FlatCasette}
				height={946}
				width={541}
			/>
			<Composition
				id="SpaceDust"
				component={SpaceDust}
				durationInFrames={1500}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="TunnelMask"
				component={TunnelMask}
				durationInFrames={1500}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="Pitch"
				component={Pitch}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="NormallyTakes"
				component={NormallyTakes}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="NormallyTakesMultiplied"
				component={NormallyTakesMultiplied}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="WayTooSlow"
				component={WayTooSlow}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="WriteInReact"
				component={WriteInReact}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Still
				id="WriteInReactHomepage"
				component={WriteInReactHomepage}
				height={1080}
				width={1920}
			/>
			<Composition
				id="Cursor"
				component={Cursor}
				durationInFrames={500}
				height={1080}
				width={1920}
				fps={24}
				defaultProps={{
					driver: 1,
					width: null,
				}}
			/>
			<Composition
				id="PlayerExample"
				component={PlayerExample}
				durationInFrames={300}
				height={900}
				width={1920 / 2}
				fps={24}
				defaultProps={{
					delay: 0,
					width: null,
					flipProgress: 0,
				}}
			/>
			<Composition
				id="Free"
				component={Free}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="Paid"
				component={Paid}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
				defaultProps={{
					start: 0,
				}}
			/>
			<Composition
				id="Pricing"
				component={Pricing}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="ProductLineUp"
				component={ProductLineUp}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="VideoApps"
				component={VideoApps}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="SourceAvailable"
				component={SourceAvailable}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="Curtain"
				component={Curtain}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="PricingToSource"
				component={PricingToSourceAvailable}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="EndCard"
				component={EndCard}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="WhatWillYouBuild"
				component={WhatWillYouBuild}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="ColorSwitcher"
				component={ColorSwitcher}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="Checklist"
				component={Checklist}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="RocketCard"
				component={RocketCard}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="LambdaVis"
				component={LambdaVis}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="WheelTransitionIn"
				component={WheelTransitionIn}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="WheelTransitionOut"
				component={WheelTransitionOut}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
			/>
			<Composition
				id="Cluster"
				component={Cluster}
				durationInFrames={300}
				height={720}
				width={1280}
				fps={24}
			/>
			<Composition
				id="NpmInstallVideoLight"
				component={NpmInstallVideo}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
				defaultProps={{
					background: 'white',
				}}
			/>
			<Composition
				id="NpmInstallVideoDark"
				component={NpmInstallVideo}
				durationInFrames={300}
				height={1080}
				width={1920}
				fps={24}
				defaultProps={{
					background: '#18191a',
				}}
			/>
			<Composition
				id="HypeTrailer"
				component={HypeTrailer}
				durationInFrames={300}
				height={1080}
				width={1080}
				fps={24}
			/>
			<Composition
				id="HypeCircles"
				component={HypeCircles}
				durationInFrames={300}
				height={1080}
				width={1080}
				fps={24}
			/>
			<Composition
				id="Hype"
				component={Hype}
				durationInFrames={197 * 5}
				height={1080}
				width={1080}
				fps={24}
			/>
			<Composition
				id="HypeLogo"
				component={HypeLogo}
				durationInFrames={300}
				height={1080}
				width={1080}
				fps={24}
			/>
			<Composition
				id="HypeDate"
				component={HypeDate}
				durationInFrames={300}
				height={1080}
				width={1080}
				fps={24}
			/>
		</>
	);
};
