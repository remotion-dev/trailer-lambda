import {
	interpolate,
	interpolateColors,
	measureSpring,
	spring,
	SpringConfig,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const viewSize = 572.801;

const radius = 300;
const scaledSize = 30;

const springConfig: Partial<SpringConfig> = {
	damping: 50,
};

export const Drop: React.FC<{
	angle: number;
	delay: number;
}> = ({angle, delay}) => {
	const {width, fps, height} = useVideoConfig();
	const frame = useCurrentFrame();
	const duration = measureSpring({fps: 30, ...springConfig});
	const progress = spring({
		fps,
		frame: frame - delay,
		config: springConfig,
	});
	const baseOffset = radius + scaledSize;
	const initialOffset = baseOffset * 0.85;
	const endOffset = baseOffset * 1.01;
	const offset = interpolate(progress, [0, 1], [initialOffset, endOffset]);
	const scale = interpolate(
		frame - delay,
		[duration - 3, duration + 3],
		[1, 0],
		{
			extrapolateRight: 'clamp',
			extrapolateLeft: 'clamp',
		}
	);

	const colors = ['#42e9f5', '#4290f5', '#42e9f5'];
	const color = interpolateColors(angle, [0, Math.PI, Math.PI * 2], colors);
	const adjustedAngle = angle + Math.PI / 2;
	const offsetX = Math.cos(adjustedAngle) * offset - scaledSize / 2;
	const offsetY = Math.sin(adjustedAngle) * offset - scaledSize / 2;
	return (
		<svg
			viewBox={`0 0 ${viewSize} ${viewSize}`}
			xmlSpace="preserve"
			style={{
				width: scaledSize,
				position: 'absolute',
				left: width / 2 + offsetX,
				top: height / 2 + offsetY,
				transform: `rotate(${
					(Math.PI / 4) * 6 + adjustedAngle
				}rad) scale(${scale})`,
			}}
		>
			<path
				fill={color}
				d="M520.25,353.6c0,125-100.5,219.201-233.8,219.201S52.55,478.6,52.55,353.6c0-115.3,164.7-301.5,197.7-337.7
        c9.3-10.2,22.4-15.9,36.2-15.9s26.9,5.8,36.2,15.9C355.55,52.1,520.25,238.4,520.25,353.6z"
			/>
		</svg>
	);
};
