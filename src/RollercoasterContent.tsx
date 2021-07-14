import {Environment} from '@react-three/drei';
import {useThree} from '@react-three/fiber';
import React, {useEffect} from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import SimplexNoise from 'simplex-noise';
import {Curve, Vector3} from 'three';
import {CAMERA_POSITION} from './rollercoaster-const';

const simplexNoise = new SimplexNoise('seed');

const getPointFor = (prog: number, show: number) => {
	const actualProg = Math.min(prog, show);
	const tx = simplexNoise.noise2D(0, actualProg * 2) * 100;
	const ty = Math.sin(2 * Math.PI * actualProg * 2) * 10;
	const tz = interpolate(actualProg, [0, 1], [1000, 0]);

	return [tx, ty, tz];
};

const getPointForOut = (prog: number, show: number) => {
	const actualProg = Math.min(prog, show);

	const [tx, ty, tz] = getPointFor(actualProg, show);
	const offset = simplexNoise.noise2D(2, actualProg * 2) * 2;
	return [
		tx + Math.sin(actualProg * 50) * (offset + 5),
		ty + Math.cos(actualProg * 50) * (offset + 5),
		tz,
	];
};

class CustomSinCurve extends Curve<Vector3> {
	max: number;
	constructor(max: number) {
		super();
		this.max = max;
	}
	getPoint(prog: number) {
		const [tx, ty, tz] = getPointFor(prog, this.max);

		return new Vector3().set(tx, ty, tz);
	}
}

class Outside extends Curve<Vector3> {
	max: number;
	constructor(max: number) {
		super();
		this.max = max;
	}
	getPoint(prog: number) {
		const [tx, ty, tz] = getPointForOut(prog, this.max);

		return new Vector3().set(tx, ty, tz);
	}
}

const delta = 0.001;

export const RollercoasterContent: React.FC = () => {
	const three = useThree();

	const frame = useCurrentFrame();
	const alongLine = interpolate(frame, [0, 250], [0, 1 - delta], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const path = new CustomSinCurve(alongLine + 0.05);
	const path2 = new Outside(alongLine + 0.05);

	useEffect(() => {
		const point = path.getPointAt(alongLine);
		const tangent = path.getTangentAt(alongLine);
		three.camera.position.set(point.x, point.y + 10, point.z);

		three.camera.lookAt(
			point.x + tangent.x,
			point.y + 10 + tangent.y,
			point.z + tangent.z
		);
	}, [alongLine, path, three.camera]);

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
				<tubeGeometry attach="geometry" args={[path, 400, 2, 100, false]} />
				<meshStandardMaterial transparent attach="material" color="#e9f5ff" />
			</mesh>
			<mesh receiveShadow>
				<tubeGeometry attach="geometry" args={[path2, 4000, 0.3, 400, false]} />
				<meshStandardMaterial transparent attach="material" color="#6bbfff" />
			</mesh>
		</>
	);
};
