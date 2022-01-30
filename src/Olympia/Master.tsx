import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Stroke} from './Stroke';

export const Olympia: React.FC<{
	focalPoint: readonly [number, number];
	backgroundColor: string;
}> = ({focalPoint, backgroundColor}) => {
	const {width, height, durationInFrames} = useVideoConfig();
	const frame = useCurrentFrame();
	const rotation = interpolate(frame, [0, durationInFrames], [0, Math.PI]);
	const size = Math.sqrt(width * width + height * height);
	return (
		<div>
			<svg
				style={{
					transform: `translateY(${(height - size) / 2}px) translateX(${
						(width - size) / 2
					}px) rotate(${rotation}rad)`,
					backgroundColor,
				}}
				width={size}
				height={size}
				viewBox={`0 0 ${size} ${size}`}
			>
				{new Array(1200).fill(1).map((key, i) => {
					return <Stroke key={i} seed={i} focalPoint={focalPoint} />;
				})}
			</svg>
		</div>
	);
};
