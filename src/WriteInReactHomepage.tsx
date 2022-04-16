import React from 'react';
import {Freeze, useVideoConfig} from 'remotion';
import {WriteInReact} from './WriteInReact';

export const WriteInReactHomepage: React.FC = () => {
	const {width} = useVideoConfig();
	return (
		<Freeze frame={100}>
			<WriteInReact flipProgress={0} width={width} flipDelay={5000} />
		</Freeze>
	);
};
