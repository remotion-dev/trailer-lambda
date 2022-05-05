import React from 'react';
import {
	AbsoluteFill,
	interpolate,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import SimplexNoise from 'simplex-noise';
import {remapSpeed} from './remap-speed';

const simplexNoise = [
	new SimplexNoise('simplexnoise'),
	new SimplexNoise('simplexnoise2'),
	new SimplexNoise('simplexnoise3'),
	new SimplexNoise('simplexnoise4'),
];

export const HypeTrailer: React.FC = () => {
	const frame = useCurrentFrame();

	const posterizedFrame = Math.round(frame / 2) * 2;
	const remappedFrame = remapSpeed({
		frame: posterizedFrame,
		speed: (f) => interpolate(f, [0, 30, 40, 60], [1, 0, 0, -1]),
	});
	const veryPosterizedFrame = Math.round(frame / 3) * 3;
	const {fps} = useVideoConfig();
	const scale = (delay: number) =>
		spring({
			fps,
			frame: remappedFrame - delay,
			config: {
				damping: 200,
				mass: 0.3,
			},
		});
	const randomRotatiom = (index: number) =>
		simplexNoise[index % simplexNoise.length].noise2D(veryPosterizedFrame, 0) *
		0.015;
	return (
		<AbsoluteFill style={{}}>
			<AbsoluteFill
				style={{
					transform: `scale(0.8) translateX(-${(1920 - 1080) / 2}px)`,
				}}
			>
				<svg
					width="1920"
					height="1080"
					viewBox="0 0 1920 1080"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						style={{
							transformBox: 'fill-box',
							transformOrigin: 'center',
							transform: `scale(${scale(0)}) rotate(${randomRotatiom(0)}rad)`,
						}}
						d="M1135.78 717.895L1146.44 718.267C1154.49 718.548 1161.72 717.536 1168.12 715.23C1174.53 712.924 1179.94 709.635 1184.35 705.362C1188.93 701.096 1192.43 696.001 1194.85 690.077C1197.43 684.002 1198.85 677.332 1199.1 670.069C1199.35 662.963 1198.4 656.29 1196.25 650.049C1194.09 643.808 1190.88 638.399 1186.62 633.824C1182.51 629.254 1177.34 625.595 1171.11 622.848C1164.88 620.101 1157.82 618.59 1149.93 618.314L1139.27 617.942L1135.78 717.895ZM1094.22 577.002L1162.9 579.401C1175.06 579.826 1186.35 582.67 1196.76 587.935C1207.32 593.205 1216.41 600.083 1224.02 608.57C1231.79 616.904 1237.78 626.599 1241.97 637.654C1246.18 648.551 1248.07 659.922 1247.66 671.764C1247.25 683.449 1244.57 694.659 1239.61 705.395C1234.81 715.978 1228.24 725.234 1219.9 733.164C1211.72 741.099 1202.18 747.327 1191.27 751.847C1180.52 756.373 1168.98 758.42 1156.67 757.99L1087.98 755.592L1094.22 577.002Z"
						fill="#0B84F3"
					/>
					<path
						style={{
							transformBox: 'fill-box',
							transformOrigin: 'center',
							transform: `scale(${scale(1)}) rotate(${randomRotatiom(1)}rad)`,
						}}
						d="M454.175 414.435H462.944C472.108 414.435 479.139 412.539 484.037 408.747C488.935 404.955 491.384 399.504 491.384 392.394C491.384 385.284 488.935 379.833 484.037 376.041C479.139 372.249 472.108 370.353 462.944 370.353H454.175V414.435ZM556.322 513.264H498.494L454.175 444.534V513.264H407.723V334.566H480.008C489.962 334.566 498.652 336.067 506.078 339.069C513.504 341.913 519.587 345.863 524.327 350.919C529.225 355.975 532.859 361.821 535.229 368.457C537.757 375.093 539.021 382.203 539.021 389.787C539.021 403.375 535.703 414.435 529.067 422.967C522.589 431.341 512.951 437.029 500.153 440.031L556.322 513.264Z"
						fill="#eeeeee"
					/>
					<path
						style={{
							transformBox: 'fill-box',
							transformOrigin: 'center',
							transform: `scale(${scale(1)}) rotate(${randomRotatiom(0)}rad)`,
						}}
						d="M638.175 365.583L583.164 370.396L585.767 400.144L637.709 395.6L641.138 434.792L589.196 439.336L591.881 470.029L646.892 465.216L650.321 504.409L549.035 513.27L533.46 335.252L634.746 326.391L638.175 365.583Z"
						fill="#0B84F3"
					/>
					<path
						style={{
							transformBox: 'fill-box',
							transformOrigin: 'center',
							transform: `scale(${scale(2)}) rotate(${randomRotatiom(2)}rad)`,
						}}
						d="M889.664 429.089C889.54 436.198 890.769 442.777 893.35 448.827C895.93 454.877 899.473 460.154 903.977 464.657C908.481 469.161 913.713 472.728 919.671 475.361C925.791 477.838 932.248 479.136 939.04 479.254C945.833 479.373 952.252 478.3 958.297 476.035C964.502 473.615 969.934 470.233 974.592 465.89C979.409 461.549 983.212 456.401 986.002 450.445C988.793 444.488 990.25 437.956 990.374 430.847C990.498 423.738 989.27 417.159 986.689 411.109C984.108 405.059 980.487 399.781 975.825 395.275C971.321 390.771 966.009 387.281 959.889 384.804C953.93 382.172 947.554 380.796 940.761 380.677C933.968 380.559 927.469 381.71 921.264 384.13C915.219 386.395 909.868 389.699 905.209 394.042C900.551 398.385 896.827 403.535 894.036 409.491C891.246 415.448 889.789 421.98 889.664 429.089ZM841.087 428.241C841.318 414.971 843.982 402.692 849.078 391.403C854.177 379.956 861.145 370.043 869.982 361.664C878.82 353.285 889.283 346.831 901.372 342.301C913.622 337.616 927.013 335.401 941.547 335.654C955.923 335.905 969.15 338.586 981.229 343.695C993.31 348.647 1003.62 355.464 1012.16 364.146C1020.86 372.831 1027.56 382.983 1032.25 394.6C1036.95 406.06 1039.18 418.425 1038.95 431.695C1038.72 444.965 1036.06 457.323 1030.96 468.77C1025.86 480.059 1018.81 489.891 1009.82 498.268C1000.98 506.647 990.438 513.179 978.189 517.864C965.942 522.391 952.63 524.529 938.255 524.278C923.721 524.024 910.413 521.421 898.332 516.47C886.411 511.363 876.181 504.468 867.641 495.786C859.101 487.104 852.482 477.032 847.783 465.573C843.087 453.955 840.855 441.511 841.087 428.241Z"
						fill="#0B84F3"
					/>
					<path
						style={{
							transformBox: 'fill-box',
							transformOrigin: 'center',
							transform: `scale(${scale(3)}) rotate(${randomRotatiom(3)}rad)`,
						}}
						d="M1199.93 427.925C1199.81 435.034 1201.04 441.613 1203.62 447.663C1206.2 453.713 1209.74 458.99 1214.25 463.493C1218.75 467.996 1223.98 471.564 1229.94 474.196C1236.06 476.674 1242.52 477.971 1249.31 478.09C1256.1 478.209 1262.52 477.135 1268.57 474.871C1274.77 472.45 1280.2 469.069 1284.86 464.725C1289.68 460.385 1293.48 455.236 1296.27 449.28C1299.06 443.324 1300.52 436.791 1300.64 429.683C1300.77 422.574 1299.54 415.994 1296.96 409.944C1294.38 403.894 1290.76 398.616 1286.1 394.11C1281.59 389.607 1276.28 386.117 1270.16 383.639C1264.2 381.007 1257.82 379.632 1251.03 379.513C1244.24 379.394 1237.74 380.545 1231.53 382.965C1225.49 385.23 1220.14 388.534 1215.48 392.878C1210.82 397.221 1207.1 402.371 1204.31 408.327C1201.52 414.283 1200.06 420.816 1199.93 427.925ZM1151.36 427.077C1151.59 413.807 1154.25 401.527 1159.35 390.239C1164.45 378.792 1171.41 368.879 1180.25 360.5C1189.09 352.121 1199.55 345.666 1211.64 341.137C1223.89 336.452 1237.28 334.236 1251.82 334.49C1266.19 334.741 1279.42 337.421 1291.5 342.531C1303.58 347.482 1313.89 354.299 1322.43 362.982C1331.13 371.667 1337.83 381.818 1342.52 393.436C1347.22 404.896 1349.45 417.26 1349.22 430.53C1348.99 443.8 1346.33 456.159 1341.23 467.606C1336.13 478.894 1329.09 488.727 1320.09 497.103C1311.25 505.482 1300.71 512.014 1288.46 516.699C1276.21 521.226 1262.9 523.364 1248.52 523.113C1233.99 522.859 1220.68 520.257 1208.6 515.305C1196.68 510.198 1186.45 503.304 1177.91 494.621C1169.37 485.939 1162.75 475.868 1158.05 464.408C1153.36 452.791 1151.13 440.347 1151.36 427.077Z"
						fill="#eeeeee"
					/>
					<path
						style={{
							transformBox: 'fill-box',
							transformOrigin: 'center',
							transform: `scale(${scale(3)}) rotate(${randomRotatiom(1)}rad)`,
						}}
						d="M1077.06 374.401L1074.63 513.736L1028.18 512.925L1030.61 373.59L992.462 372.924L993.149 333.588L1115.9 335.731L1115.21 375.067L1077.06 374.401Z"
						fill="#eeeeee"
					/>
					<path
						style={{
							transformBox: 'fill-box',
							transformOrigin: 'center',
							transform: `scale(${scale(5)}) rotate(${randomRotatiom(2)}rad)`,
						}}
						d="M1157.55 334.451L1174.68 512.326L1128.44 516.778L1111.31 338.903L1157.55 334.451Z"
						fill="#0B84F3"
					/>
					<path
						style={{
							transformBox: 'fill-box',
							transformOrigin: 'center',
							transform: `scale(${scale(4)}) rotate(${randomRotatiom(2)}rad)`,
						}}
						d="M638.206 520.339L663.853 340.908L709.816 339.704L748.084 434.009L781.128 337.837L827.09 336.633L862.094 514.476L815.895 515.686L797.802 413.266L758.323 517.193L739.844 517.677L697.112 415.903L684.405 519.129L638.206 520.339Z"
						fill="#eeeeee"
					/>
					<path
						style={{
							transformBox: 'fill-box',
							transformOrigin: 'center',
							transform: `scale(${scale(5)}) rotate(${randomRotatiom(3)}rad)`,
						}}
						d="M725.349 684.373L708.164 623.723L683.715 681.826L725.349 684.373ZM735.494 720.372L669.258 716.321L656.718 746.659L607.277 743.635L686.079 569.423L736.702 572.519L793.685 755.036L744.244 752.012L735.494 720.372Z"
						fill="#eeeeee"
					/>
					<path
						style={{
							transformBox: 'fill-box',
							transformOrigin: 'center',
							transform: `scale(${scale(6)}) rotate(${randomRotatiom(2)}rad)`,
						}}
						d="M1322.86 513.84L1330.65 335.312L1377.06 337.339L1458.01 450.234L1462.77 341.081L1508.94 343.097L1501.15 521.625L1454.98 519.609L1374.03 406.713L1369.27 515.866L1322.86 513.84Z"
						fill="#0B84F3"
					/>
					<path
						style={{
							transformBox: 'fill-box',
							transformOrigin: 'center',
							transform: `scale(${scale(7)}) rotate(${randomRotatiom(1)}rad)`,
						}}
						d="M591.175 573.392V712.748H646.87V752.09H544.723V573.392H591.175Z"
						fill="#0B84F3"
					/>
					<path
						style={{
							transformBox: 'fill-box',
							transformOrigin: 'center',
							transform: `scale(${scale(8)}) rotate(${randomRotatiom(2)}rad)`,
						}}
						d="M763.643 752.255L793.979 573.557L839.957 573.557L875.744 668.831L911.294 573.557L957.272 573.557L987.608 752.255L941.393 752.255L925.988 649.397L883.802 752.255L865.316 752.255L825.263 649.397L809.858 752.255L763.643 752.255Z"
						fill="#0B84F3"
					/>
					<path
						style={{
							transformBox: 'fill-box',
							transformOrigin: 'center',
							transform: `scale(${scale(9)}) rotate(${randomRotatiom(3)}rad)`,
						}}
						d="M1015.22 719.646L1025.39 720.268C1037.06 720.982 1045.51 719.995 1050.74 717.307C1055.97 714.62 1058.79 709.964 1059.2 703.34C1059.6 696.717 1057.37 691.752 1052.51 688.447C1047.64 685.142 1039.38 683.133 1027.71 682.419L1017.54 681.797L1015.22 719.646ZM1019.65 647.259L1028.16 647.78C1042.67 648.668 1050.28 643.355 1050.98 631.843C1051.69 620.33 1044.79 614.13 1030.28 613.243L1021.76 612.722L1019.65 647.259ZM977.565 574.402L1046.64 578.627C1063.04 579.63 1075.26 584.335 1083.29 592.741C1091.33 601.147 1094.89 612.763 1093.98 627.587C1093.43 636.576 1091.32 643.966 1087.64 649.756C1084.13 655.398 1078.94 660.067 1072.06 663.762C1078.61 665.429 1084.09 667.743 1088.5 670.703C1093.07 673.516 1096.67 676.902 1099.27 680.86C1102.04 684.828 1103.91 689.217 1104.88 694.025C1105.85 698.833 1106.17 703.918 1105.85 709.28C1105.33 717.639 1103.38 724.959 1099.99 731.242C1096.76 737.534 1092.32 742.724 1086.69 746.812C1081.22 750.91 1074.63 753.831 1066.92 755.576C1059.22 757.32 1050.63 757.903 1041.17 757.325L966.656 752.767L977.565 574.402Z"
						fill="#eeeeee"
					/>
					<path
						style={{
							transformBox: 'fill-box',
							transformOrigin: 'center',
							transform: `scale(${scale(8)}) rotate(${randomRotatiom(1)}rad)`,
						}}
						d="M1317.49 687.379L1296.12 628.076L1275.78 687.743L1317.49 687.379ZM1330.12 722.583L1263.77 723.162L1253.37 754.301L1203.84 754.733L1270.3 575.448L1321.01 575.006L1390.59 753.103L1341.06 753.536L1330.12 722.583Z"
						fill="#eeeeee"
					/>
				</svg>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};