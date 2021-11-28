import {useGLTF} from '@react-three/drei';
import React, {useRef} from 'react';
import {interpolate, useCurrentFrame} from 'remotion';

export const Casette: React.FC = (props) => {
	const frame = useCurrentFrame();
	const group = useRef();
	const {nodes, materials} = useGLTF(
		'https://jonnyburger.s3.eu-central-1.amazonaws.com/casette-full-labeled-v4.glb'
	);
	const rotation = interpolate(frame, [0, 90], [0, Math.PI * 2]);

	return (
		<group ref={group} {...props} dispose={null}>
			<mesh
				castShadow
				receiveShadow
				geometry={nodes.uploads_files_1020431_SM_Video_Tape.geometry}
				material={materials['Default OBJ']}
				rotation={[Math.PI / 2, 0, rotation]}
			/>
		</group>
	);
};
