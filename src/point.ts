export function point({
	x,
	y,
	canvas,
	color,
	size,
}: {
	x: number;
	y: number;
	canvas: CanvasRenderingContext2D;
	color: string;
	size: number;
}) {
	canvas.beginPath();
	canvas.arc(x, y, size, 0, 2 * Math.PI, true);
	canvas.fillStyle = color; // add a fill color: ;

	canvas.fill();
}
