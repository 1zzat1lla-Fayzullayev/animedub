import React, { useState } from 'react'
import SliderShow from '../shared/SliderShow'
import Wrapper from '../layout/Wrapper'
import SliderCard from '../shared/SliderCard'
import PicturesData from '../PicturesData'
import SliderPremiumCard from '../shared/SliderPremiumCard'
import Card from '../shared/Card'


function Main({ user }) {
	const [isPremiumUser, setIsPremiumUser] = useState(false)

	// Use the isPremiumUser state to determine the text for h2
	const premiumText = isPremiumUser ? 'Premium' : 'Free'

	return (
		<div>
			<SliderShow />
			<Wrapper>
				<div className='flex gap-2 justify-center md:justify-start items-center'>
					<h2 className='linear_text text-[30px] font-bold font-Montserrat my-[20px]'>
						Anime
					</h2>
					<img src={PicturesData.star} alt='star' className='w-[30px]' />
				</div>
				<SliderCard user={user} />
				<div className='flex gap-2 justify-center md:justify-start items-center'>
					<h2 className='linear_text text-[30px] font-bold font-Montserrat my-[20px]'>
						{premiumText}
					</h2>
					<img src={PicturesData.star} alt='star' className='w-[30px]' />
				</div>
				<SliderPremiumCard user={user} />
			</Wrapper>
			{/* Pass isPremiumUser state to the Card component */}
			<Card user={user} isPremiumUser={isPremiumUser} />
		</div>
	)
}

export default Main
