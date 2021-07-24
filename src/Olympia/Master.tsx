import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Stroke} from './Stroke';

export const Olympia: React.FC = () => {
	const {width, height, durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();
	const rotation = interpolate(frame, [0, durationInFrames], [0, Math.PI]);
	const size = Math.sqrt(width * width + height * height);
	return (
		<div>
			<svg
				style={{
					backgroundColor: 'white',
					transform: `translateY(${(height - size) / 2}px) translateX(${
						(width - size) / 2
					}px) rotate(${rotation}rad)`,
				}}
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}
			>
				{new Array(2400).fill(1).map((key, i) => {
					return <Stroke key={i} seed={i} />;
				})}
			</svg>
		</div>
	);
};
