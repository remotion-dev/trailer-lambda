import {Environment} from 'drei';
import React, {useEffect} from 'react';
import {useThree} from 'react-three-fiber';
import {interpolate, useCurrentFrame} from 'remotion';
import SimplexNoise from 'simplex-noise';
import {Curve, Vector3} from 'three';
import {CAMERA_POSITION} from './rollercoaster-const';

const simplexNoise = new SimplexNoise('seed');

const getPointFor = (prog: number) => {
	const tx = simplexNoise.noise2D(0, prog) * 100;
	const ty = Math.sin(2 * Math.PI * prog * 2) * 10;
	const tz = interpolate(prog, [0, 1], [200, 0]);

	return [tx, ty, tz];
};

class CustomSinCurve extends Curve<Vector3> {
	getPoint(prog: number) {
		const [tx, ty, tz] = getPointFor(prog);

		return new Vector3().set(tx, ty, tz);
	}
}

const path = new CustomSinCurve();

const delta = 0.001;

export const RollercoasterContent: React.FC = () => {
	const three = useThree();

	const frame = useCurrentFrame();
	const alongLine = interpolate(frame, [0, 700], [0, 1 - delta], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	useEffect(() => {
		const point = path.getPointAt(alongLine);
		const tangent = path.getTangentAt(alongLine);

		three.camera.position.set(point.x, point.y + 10, point.z);

		three.camera.lookAt(
			point.x + tangent.x,
			point.y + 10 + tangent.y,
			point.z + tangent.z
		);
	}, [alongLine, three.camera]);

	return (
		<>
			<Environment preset="city" />
			<ambientLight castShadow intensity={0.7} />
			<rectAreaLight
				castShadow
				width={30}
				height={30}
				intensity={1}
				color="white"
				position={CAMERA_POSITION}
			/>
			<mesh receiveShadow>
				<tubeGeometry attach="geometry" args={[path, 100, 2, 100, false]} />
				<meshStandardMaterial transparent attach="material" color="#9c88ff" />
			</mesh>
		</>
	);
};
