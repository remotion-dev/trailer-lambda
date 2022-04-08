import React, {useState} from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {COLORS} from './colors';
import {Curtain} from './Curtain';
import {ensureSFProBold} from './load-font';

export const SourceAvailable: React.FC = () => {
	const {fps} = useVideoConfig();
	const frame = useCurrentFrame();
	const [sfPro] = useState(() => ensureSFProBold());
	const progress = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});

	const scale = interpolate(progress, [0, 1], [0.75, 1]);

	return (
		<Curtain>
			<AbsoluteFill
				style={{
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<div
					style={{
						display: 'flex',
						flexDirection: 'row',
						alignItems: 'center',
						transform: `scale(${scale})`,
					}}
				>
					<svg
						width={110}
						style={{
							marginRight: 30,
						}}
						fill="black"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 496 512"
					>
						<path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
					</svg>{' '}
					<h1
						style={{
							fontFamily: sfPro,
							fontSize: 100,
							color: COLORS[0],
							marginTop: 0,
							marginBottom: 0,
							fontWeight: 700,
							lineHeight: 1,
							textAlign: 'center',
							justifyContent: 'center',
							verticalAlign: 'middle',
							display: 'inline-flex',
							alignItems: 'center',
							whiteSpace: 'pre',
						}}
					>
						Source-available
					</h1>
					<div
						style={{
							fontFamily: sfPro,
							fontSize: 40,
							color: 'black',
							marginLeft: 30,
							border: '4px solid ' + 'black',
							padding: '6px 20px',
							borderRadius: 12,
							marginTop: 10,
							display: 'inline-flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 576 512"
							fill="black"
							height={30}
							style={{
								marginRight: 10,
							}}
						>
							<path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
						</svg>
						12k
					</div>
				</div>
			</AbsoluteFill>
		</Curtain>
	);
};
