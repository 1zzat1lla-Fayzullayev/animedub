import React from 'react'
import Wrapper from '../layout/Wrapper'

function Card({ card }) {
	if (!card) {
		return null
	}

	return (
		<Wrapper>
			<div className='flex flex-col md:flex-row flex-w justify-center items-center gap-5 p-5 font-Inter cursor-pointer'>
				<div className='card w-[300px] h-[350px] rounded-[20px] p-[5px]'>
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
