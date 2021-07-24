import {useVideoConfig} from 'remotion';
import {Stroke} from './Stroke';

export const Olympia: React.FC = () => {
	const {width, height} = useVideoConfig();
	return (
		<div>
			<svg
				style={{
					backgroundColor: 'white',
				}}
				width={width}
				height={height}
				viewBox={`0 0 ${width} ${height}`}
			>
				{new Array(2400).fill(1).map((key, i) => {
					return <Stroke key={i} seed={i} />;
				})}
			</svg>
		</div>
	);
};
