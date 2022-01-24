import {ThreeCanvas} from '@remotion/three';
import {useCallback, useState} from 'react';
import {
	continueRender,
	delayRender,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import * as THREE from 'three';
import {TextMesh} from './TextMesh';

export const ThreeDText: React.FC<{
	scale: number;
	num: number;
	sideRotation: number;
	uprightRotation: number;
}> = ({scale, num, sideRotation, uprightRotation}) => {
	const [handle] = useState(() => delayRender());
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();
	const onCreated = useCallback(
		({gl}) => {
			gl.toneMapping = THREE.NoToneMapping;
			continueRender(handle);
		},
		[handle]
	);
	return (
		<ThreeCanvas
			orthographic
			width={width * 2}
			height={height * 2}
			camera={{
				near: -2000,
				far: 2000,
			}}
			style={{
				position: 'absolute',
				transform: `translateX(${-width / 2}px) translateY(${-height / 2}px)`,
			}}
			onCreated={onCreated}
		>
			<TextMesh
				uprightRotation={uprightRotation}
				sideRotation={sideRotation}
				scale={scale}
				frame={frame}
				fps={fps}
				text={String(num)}
			/>
		</ThreeCanvas>
	);
};
