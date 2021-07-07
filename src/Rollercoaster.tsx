import {ThreeCanvas} from '@remotion/three';
import React from 'react';
import {useVideoConfig} from 'remotion';
import {CAMERA_POSITION} from './rollercoaster-const';
import {RollercoasterContent} from './RollercoasterContent';

export const Rollercoaster: React.FC = () => {
	const {width, height} = useVideoConfig();

	return (
		<ThreeCanvas
			width={width}
			height={height}
			style={{backgroundColor: 'white'}}
			camera={{fov: 75, position: CAMERA_POSITION}}
		>
			<RollercoasterContent />
		</ThreeCanvas>
	);
};
