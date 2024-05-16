// src/shared/Card.js
import React from 'react'
import Wrapper from '../layout/Wrapper'
import PicturesData from '../PicturesData'
import { useUser } from '../context/UsersContext'

function Card({ card }) {
	const { isPremiumUser } = useUser()

	if (!card) {
		return null
	}

	return (
		<Wrapper>
			<div className='flex flex-col md:flex-row flex-w justify-center items-center gap-5 m-5 font-Inter cursor-pointer'>
				<div className='relative card w-[300px] h-[350px] rounded-[20px] p-[5px]'>
					{card.premium && !isPremiumUser && (
						<img
							src={PicturesData.premium}
							alt='premium'
							className='absolute z-[10] w-[35px] blur_div p-1 rounded-bl-[5px] rounded-tr-[15px] right-[5px]'
						/>
					)}
					<div className='card__content rounded-[17px] w-full h-full overflow-hidden'>
						{card.cardpicture && (
							<img
								src={card.cardpicture}
								alt='404'
								className='h-full w-full object-cover rounded-[17px] transition-all ease-in hover:scale-105'
							/>
						)}
						{card.cardname && (
							<div className='absolute top-[80%] left-5 text-white font-bold text-[25px]'>
								<h1>{card.cardname}</h1>
							</div>
						)}
					</div>
				</div>
			</div>
		</Wrapper>
	)
}

export default Card
