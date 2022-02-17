export const greekLetterOriginalWidth = 463;
export const greekLetterOriginalHeight = 738;

export const GreekLetter: React.FC<{
	alternate: boolean;
	width: number;
	height: number;
}> = ({alternate, height, width}) => {
	return (
		<svg
			width={width}
			height={height}
			viewBox={`0 0 ${greekLetterOriginalWidth} ${greekLetterOriginalHeight}`}
			fill="none"
			style={{
				transform: alternate ? undefined : `rotate(180deg)`,
			}}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M203 264L1.5 737.5H16L82.5 737L239.5 363.5L375.5 733H443.5H461.5L183 1L115 26L203 264Z"
				fill="#0B84F3"
				stroke="#0B84F3"
			/>
		</svg>
	);
};
