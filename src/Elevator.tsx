import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {useFont} from './load-font';
import {FONT_SIZE} from './math/font-size';
import {OpenTypeNumber} from './OpenTypeNumber';

const charContainer: React.CSSProperties = {
	width: 200,
	height: FONT_SIZE * 1.5,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
};

const leftNums = [5, 6, 7, 8, 9, 0, 1, 2, 3, 4];
const rightNums = [6, 7, 8, 9, 0, 1, 2, 3, 4, 5];

const spacingBetween = 15;
const totalWidth = (charContainer.width as number) * 2 + spacingBetween;
const totalHeight = (charContainer.height as number) * rightNums.length;

export const Elevator: React.FC<{
	countDownDelay?: number;
}> = ({countDownDelay = 0}) => {
	const font = useFont();
	const frame = useCurrentFrame();
	const {width, height} = useVideoConfig();
	if (!font) {
		return null;
	}
	const topWhereLowestIsCentered =
		height / 2 - (charContainer.height as number) / 2;
	const topWhereGreatestIsCentered =
		topWhereLowestIsCentered - totalHeight + (charContainer.height as number);

	const animation = interpolate(frame - countDownDelay, [0, 60], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const leftAnimation = interpolate(animation, [0.55, 0.65], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	const rightColumnMarginTop = interpolate(
		animation,
		[0, 1],
		[0, totalHeight - (charContainer.height as number)],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);
	const leftColumnMarginTop = interpolate(
		leftAnimation,
		[0, 1],
		[0, charContainer.height as number],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		}
	);

	return (
		<AbsoluteFill
			style={{
				top: topWhereGreatestIsCentered,
			}}
		>
			{rightNums.map((num, idx) => {
				return (
					<AbsoluteFill
						style={{
							left: (width - totalWidth) / 2,
							width: totalWidth,
							top: idx * (charContainer.height as number) + leftColumnMarginTop,
						}}
					>
						<div>
							<div style={{...charContainer}}>
								<OpenTypeNumber font={font} str={String(leftNums[idx])} />
							</div>
						</div>
					</AbsoluteFill>
				);
			})}
			{rightNums.map((num, idx) => {
				return (
					<AbsoluteFill
						style={{
							left: (width - totalWidth) / 2,
							width: totalWidth,
							top:
								idx * (charContainer.height as number) + rightColumnMarginTop,
						}}
					>
						<div
							style={{
								...charContainer,
								marginLeft: spacingBetween + (charContainer.width as number),
							}}
						>
							<OpenTypeNumber font={font} str={String(num)} />
						</div>
					</AbsoluteFill>
				);
			})}
		</AbsoluteFill>
	);
};
