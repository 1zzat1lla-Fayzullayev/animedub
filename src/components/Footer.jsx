import React from 'react'
import Wrapper from '../layout/Wrapper'
import { memo } from 'react'
import PicturesData from '../PicturesData'

function Footer() {
	return (
		<>
			<Wrapper>
				<div className='flex flex-col md:flex-row items-center justify-between font-Poppins md:h-[200px] mt-[100px] gap-[20px]'>
					<img
						src={PicturesData.logo}
						alt='logo'
						className='w-[80px] rounded-full'
					/>
					<p className='text-white text-center md:text-start'>
						©️ 2024, animadub.uz, barcha huquqlar himoyalangan
					</p>
					<div className='flex flex-col md:flex-row items-center md:items-start gap-[20px] mb-[40px] md:mb-0 text-white'>
						<a href='https://t.me/AnimadubAdminBot' target='_blank'>
							Reklama
						</a>
						<a href='https://t.me/izzatilla_web' target='_blank'>
							Texnik xizmatlar
						</a>
					</div>
				</div>
			</Wrapper>
		</>
	)
}

export default memo(Footer)
