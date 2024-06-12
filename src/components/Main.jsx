// src/components/Main.js
import React, { memo } from 'react'
import SliderShow from '../shared/SliderShow'
import Wrapper from '../layout/Wrapper'
import SliderCard from '../shared/SliderCard'
import PicturesData from '../PicturesData'
import SliderPremiumCard from '../shared/SliderPremiumCard'
import Card from '../shared/Card'
import { useUser } from '../context/UsersContext'
import Dorama from '../pages/Dorama'
import DoramaCard from '../shared/DoramaCard'

function Main({ user, imagesLoaded }) {
	const { isPremiumUser } = useUser()

	const premiumText = !isPremiumUser ? 'Premium' : 'Bepul'

	return (
		<div>
			<SliderShow imagesLoaded={imagesLoaded} />
			<Wrapper>
				<div className='flex gap-2 justify-center md:justify-start items-center'>
					<h2 className='linear_text text-[30px] font-bold font-Poppins my-[20px]'>
						Multfilmlar
					</h2>
					<img src={PicturesData.star} alt='star' className='w-[30px]' />
				</div>
				<SliderCard user={user} />
				<div className='flex gap-2 justify-center md:justify-start items-center'>
					<h2 className='linear_text text-[30px] font-bold font-Poppins my-[20px]'>
						{premiumText}
					</h2>
					<img src={PicturesData.star} alt='star' className='w-[30px]' />
				</div>
				<SliderPremiumCard user={user} />
				<div className='flex gap-2 justify-center md:justify-start items-center'>
					<h2 className='linear_text text-[30px] font-bold font-Poppins my-[20px]'>
						Seriallar
					</h2>
					<img src={PicturesData.star} alt='star' className='w-[30px]' />
				</div>
				<DoramaCard user={user} />
			</Wrapper>
			<Card user={user} />
		</div>
	)
}

export default memo(Main)
