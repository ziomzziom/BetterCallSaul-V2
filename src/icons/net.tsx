import React from 'react'

export default (
	<svg width='47' height='47' viewBox='0 0 42 42'>
		<defs>
			<linearGradient
				id='net-a'
				x1='96.859%'
				x2='3.256%'
				y1='50%'
				y2='50%'
			>
				<stop offset='0%' stopColor='#672572' />
				<stop offset='100%' stopColor='#9646A3' />
			</linearGradient>
			<polygon
				id='net-b'
				points='0 .064 1.281 .064 1.281 1.363 0 1.363'
			/>
		</defs>
		<g fill='none' fillRule='evenodd'>
			{/* <circle
				cx='21'
				cy='21'
				r='21'
				fill='url(#net-a)'
				opacity='.35'
			/> */}
			<g transform='translate(5 5)'>
				<circle cx='16' cy='16' r='16' fill='url(#net-a)' />
				<g transform='translate(5.333 11.556)'>
					<polygon
						fill='#FEFEFE'
						points='11.149 .105 11.149 8.345 15.516 8.345 15.516 7.472 12.115 7.472 12.115 4.593 15.091 4.593 15.091 3.719 12.115 3.719 12.115 .978 15.327 .978 15.327 .105'
					/>
					<polygon
						fill='#FEFEFE'
						points='16.423 .105 16.423 .978 18.802 .978 18.802 8.345 19.767 8.345 19.767 .978 22.141 .978 22.141 .105'
					/>
					<g transform='translate(0 .092)'>
						<g transform='translate(0 7.023)'>
							<mask id='net-c' fill='#fff'>
								<use href='#net-b' />
							</mask>
							<path
								fill='#FEFEFE'
								d='M0.631750524,0.0641719078 C0.455859539,0.0641719078 0.306383648,0.126750524 0.183951782,0.253794549 C0.0608909853,0.380104822 -1.04821803e-05,0.53293501 -1.04821803e-05,0.713438155 C-1.04821803e-05,0.88932914 0.0608909853,1.0415304 0.183951782,1.16993711 C0.306383648,1.29813417 0.455859539,1.3627044 0.631750524,1.3627044 C0.812044025,1.3627044 0.965503145,1.29813417 1.09181342,1.16993711 C1.21843816,1.0415304 1.28133124,0.88932914 1.28133124,0.713438155 C1.28133124,0.537337526 1.21843816,0.384612159 1.09181342,0.256310273 C0.965503145,0.127484277 0.812044025,0.0641719078 0.631750524,0.0641719078'
								mask='url(#net-c)'
							/>
						</g>
						<polygon
							fill='#FEFEFE'
							points='8.365 6.973 3.941 .013 2.687 .013 2.687 8.253 3.653 8.253 3.653 1.185 8.153 8.253 9.325 8.253 9.325 .013 8.365 .013'
						/>
					</g>
				</g>
			</g>
		</g>
	</svg>
)
