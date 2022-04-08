import React, {SVGProps, useState} from 'react';
import {ensureSFProBold} from './load-font';

export const FlatCasette: React.FC<
	SVGProps<SVGSVGElement> & {
		label: string;
	}
> = ({label, ...props}) => {
	const [sfPro] = useState(() => ensureSFProBold());
	return (
		<svg
			viewBox="0 0 541 946"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M76 12H376C460.5 12 529 80.5004 529 165V661C529 694.137 502.137 721 469 721H59C33.0426 721 12 699.957 12 674V76C12 40.6538 40.6538 12 76 12Z"
				fill="white"
				stroke="black"
				strokeWidth="24"
			/>
			<rect y="814" width="541" height="132" rx="66" fill="#0B84F3" />
			<text
				fill="white"
				xmlSpace="preserve"
				style={{whiteSpace: 'pre'}}
				fontFamily={sfPro}
				fontSize="70"
				textAnchor="center"
				fontWeight="500"
				letterSpacing="0em"
			>
				<tspan x="270.0596" y="904.738" textAnchor="middle">
					{label}
				</tspan>
			</text>

			<path
				d="M85 436.167C85 445.405 88.6644 454.265 95.1872 460.798C101.71 467.33 110.557 471 119.781 471H421.219C430.443 471 439.29 467.33 445.813 460.798C452.336 454.265 456 445.405 456 436.167V262H85V436.167ZM363.25 399.2C370.023 396.83 375.893 392.41 380.046 386.551C384.199 380.692 386.43 373.685 386.43 366.5C386.43 359.315 384.199 352.308 380.046 346.449C375.893 340.59 370.023 336.17 363.25 333.8V308.444H398.654C412.523 323.873 421.219 344.091 421.219 366.5C421.219 388.909 412.523 409.12 398.654 424.556H363.25V399.2ZM224.125 308.444H316.875V424.556H224.125V308.444ZM142.346 308.444H177.75V333.8C170.977 336.17 165.107 340.59 160.954 346.449C156.801 352.308 154.57 359.315 154.57 366.5C154.57 373.685 156.801 380.692 160.954 386.551C165.107 392.41 170.977 396.83 177.75 399.2V424.556H142.346C128.477 409.12 119.781 388.902 119.781 366.5C119.781 344.098 128.477 323.873 142.346 308.444Z"
				fill="#0B84F3"
			/>
		</svg>
	);
};
