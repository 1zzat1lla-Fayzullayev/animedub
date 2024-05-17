import React from 'react'
import Wrapper from '../layout/Wrapper'

function Footer() {
	return (
		<>
			<Wrapper>
				<div className='flex flex-col md:flex-row items-center justify-between font-Inter md:h-[200px] mt-[100px] gap-[20px]'>
					<h1 className='font-bold cursor-pointer text-[30px] text-white'>
						Anime <span className='slider_h1'>DUB</span>
					</h1>
					<p className='text-white'>
						©️ 2024, animedub.uz, barcha huquqlar himoyalangan
					</p>
					<div className='flex flex-col md:flex-row items-center md:items-start gap-[20px] mb-[40px] md:mb-0 text-white'>
						<a href='#'>Reklama</a>
						<a href='https://t.me/izzatilla_web' target='_blank'>
							Texnik xizmatlar
						</a>
					</div>
				</div>
			</Wrapper>
		</>
	)
}

export default Footer
