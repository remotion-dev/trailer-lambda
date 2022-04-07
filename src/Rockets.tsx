import React from 'react';
import {useVideoConfig} from 'remotion';
import {Rocket} from './Rocket';

const container: React.CSSProperties = {
	display: 'flex',
	flex: 1,
};

const ROCKET_SIZE_1 = 700;
const ROCKET_SIZE_2 = 400;
const ROCKET_SIZE_3 = 200;

export const Rockets: React.FC = () => {
	const {width, height} = useVideoConfig();

	const rocket1OriginX = -ROCKET_SIZE_1 / 2;
	const rocket1OriginY = height + ROCKET_SIZE_1 / 2;
	const rocket1TargetX = width + 400;
	const rocket1TargetY = -ROCKET_SIZE_1;

	const rocket2OriginX = width;
	const rocket2OriginY = height + ROCKET_SIZE_2;
	const rocket2TargetX = width - ROCKET_SIZE_2 / 2;
	const rocket2TargetY = -ROCKET_SIZE_2 / 2 - 200;

	const rocket3OriginX = width + ROCKET_SIZE_3;
	const rocket3OriginY = height / 2;
	const rocket3TargetX = -ROCKET_SIZE_3;
	const rocket3TargetY = ROCKET_SIZE_3 / 2 - 200;

	return (
		<div style={container}>
			<Rocket
				fumeOut
				originX={rocket3OriginX}
				originY={rocket3OriginY}
				size={ROCKET_SIZE_3}
				targetX={rocket3TargetX}
				targetY={rocket3TargetY}
				delay={45}
			/>
			<Rocket
				fumeOut
				originX={rocket2OriginX}
				originY={rocket2OriginY}
				size={ROCKET_SIZE_2}
				targetX={rocket2TargetX}
				targetY={rocket2TargetY}
				delay={30}
			/>
			<Rocket
				fumeOut
				originX={rocket1OriginX}
				originY={rocket1OriginY}
				size={ROCKET_SIZE_1}
				targetX={rocket1TargetX}
				targetY={rocket1TargetY}
				delay={15}
			/>
		</div>
	);
};
