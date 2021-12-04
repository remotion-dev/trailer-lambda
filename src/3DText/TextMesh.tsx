import {useFrame} from '@react-three/fiber';
import React, {createRef, Fragment, useMemo} from 'react';
import {interpolate, spring} from 'remotion';
import * as THREE from 'three';
import JSONfont from './Bold.json';

export const TextMesh: React.FC<{
	frame: number;
	fps: number;
	text: string;
	scale: number;
	sideRotation: number;
	uprightRotation: number;
}> = ({frame, fps, text, sideRotation, uprightRotation, scale}) => {
	const characters = text.split('');
	const letterSpacing = 0.1;
	const surfaceRefs = useMemo(
		() =>
			new Array(characters.length)
				.fill(true)
				.map(() => createRef<JSX.IntrinsicElements['mesh']>()),
		[characters.length]
	);
	const characterRefs = useMemo(
		() =>
			new Array(characters.length)
				.fill(true)
				.map(() => createRef<JSX.IntrinsicElements['mesh']>()),
		[characters.length]
	);

	// load in font
	const font = useMemo(() => new THREE.FontLoader().parse(JSONfont), []);
	const height = 200;
	const progress = () =>
		spring({
			frame,
			fps,
			config: {
				damping: 15,
				mass: 1,
			},
		});
	const z = () => interpolate(progress(), [0, 1], [-40, 0]);
	const size = 200;

	// actions to perform in current frame
	useFrame(() => {
		const widths: number[] = [];
		characters.forEach((char, i) => {
			const geometry = characterRefs[i].current?.geometry;

			geometry?.computeBoundingBox();
			const width =
				(geometry?.boundingBox?.max?.x as number) -
				(geometry?.boundingBox?.min?.x as number);
			widths.push(width);
		});
		const totalWidth =
			widths.reduce((a, b) => a + b + letterSpacing, 0) + letterSpacing;
		for (let i = 0; i < characters.length; i++) {
			const pos =
				widths.slice(0, i).reduce((a, b) => a + b, 0) +
				i * letterSpacing -
				totalWidth / 2;
			const y = -size / 2;
			surfaceRefs[i].current.position.x = pos;
			surfaceRefs[i].current.position.y = y;
			surfaceRefs[i].current.position.z = z() + 0.01;
			characterRefs[i].current.position.x = pos;
			characterRefs[i].current.position.y = y;
			characterRefs[i].current.position.z = -height + z(i);
		}
	});

	return (
		<>
			<scene rotation={[uprightRotation, sideRotation, 0]} scale={scale}>
				{characters.map((char, i) => {
					return (
						<Fragment key={i}>
							<mesh ref={characterRefs[i]}>
								<textGeometry
									args={[
										char,
										{
											font,
											size,
											height,
										},
									]}
								/>
								<meshBasicMaterial color="#000" />
							</mesh>
							<mesh ref={surfaceRefs[i]}>
								<textGeometry
									args={[
										char,
										{
											font,
											size,
											height: 0,
										},
									]}
								/>
								<meshBasicMaterial color="#f3f3f3" />
							</mesh>
						</Fragment>
					);
				})}
			</scene>
		</>
	);
};
