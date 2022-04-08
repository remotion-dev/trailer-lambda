import React, {useState} from 'react';
import {
	AbsoluteFill,
	interpolate,
	Sequence,
	Series,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {ensureSFProBold} from './load-font';
import {StarryNumber} from './StarryNumber';
import {ToReactStarry} from './ToReactStarry';
import {WheelTransition} from './WheelTransition';

export const StarryNumbers: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const [sfPro] = useState(() => ensureSFProBold());
	const scale =
		spring({
			fps,
			frame,
			config: {
				damping: 200,
				mass: 0.3,
			},
		}) * interpolate(frame, [0, 500], [1, 1.5]);

	const seq1Length = 30;
	const seq2Length = 30;
	const seq3Length = 30;
	const seq4Length = 800;

	const startRenderedIn = seq1Length + seq2Length + seq3Length + 290;

	const scaleText = interpolate(
		spring({
			fps,
			frame: frame - startRenderedIn - 15,
			config: {
				damping: 200,
			},
		}),
		[0, 1],
		[1, 1.2]
	);

	const translateSecondsBasic = interpolate(
		spring({
			fps,
			frame: frame - startRenderedIn - 12,
			config: {
				damping: 13,
			},
		}),
		[0, 1],
		[400, -30]
	);
	const secondsOvershoot = Math.min(translateSecondsBasic, 0);

	const translateRenderedBasic = interpolate(
		spring({
			fps,
			frame: frame - startRenderedIn,
			config: {
				damping: 13,
			},
		}),
		[0, 1],
		[-400, 30]
	);

	const renderedOvershoot = Math.max(translateRenderedBasic, 0);

	const translateRendered = translateRenderedBasic + secondsOvershoot;
	const translateSeconds = translateSecondsBasic + renderedOvershoot;

	return (
		<WheelTransition type="out" delay={startRenderedIn + 127}>
			<AbsoluteFill
				style={{
					transform: `scale(${scaleText})`,
				}}
			>
				<AbsoluteFill style={{transform: `scale(${scale})`}}>
					<Series>
						<Series.Sequence durationInFrames={seq1Length}>
							<StarryNumber from="35" to="35" />
						</Series.Sequence>
						<Series.Sequence durationInFrames={seq2Length}>
							<StarryNumber from="35" to="30" />
						</Series.Sequence>
						<Series.Sequence durationInFrames={seq3Length}>
							<StarryNumber from="30" to="25" />
						</Series.Sequence>
						<Series.Sequence durationInFrames={seq4Length}>
							<AbsoluteFill
								style={{
									transform: `translateY(${
										renderedOvershoot + secondsOvershoot
									}px)`,
								}}
							>
								<ToReactStarry />
							</AbsoluteFill>
						</Series.Sequence>
					</Series>
				</AbsoluteFill>
				<Sequence from={300}>
					<AbsoluteFill>
						<div
							style={{
								fontSize: 80,
								fontFamily: sfPro,
								fontWeight: 'bold',
								textAlign: 'center',
								marginTop: 280,
								color: 'black',
								transform: `translateY(${translateRendered}px)`,
							}}
						>
							rendered in
						</div>
					</AbsoluteFill>
					<AbsoluteFill>
						<div
							style={{
								fontSize: 80,
								fontFamily: sfPro,
								fontWeight: 'bold',
								textAlign: 'center',
								marginTop: 750,
								color: 'black',
								transform: `translateY(${translateSeconds}px)`,
							}}
						>
							seconds
						</div>
					</AbsoluteFill>
				</Sequence>
			</AbsoluteFill>
		</WheelTransition>
	);
};
