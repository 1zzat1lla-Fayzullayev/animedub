import React from 'react'
import Wrapper from '../layout/Wrapper'
import PicturesData from '../PicturesData'

function Dorama({ card }) {
	return (
		<>
			<Wrapper>
				<div
					className={`flex flex-col md:flex-row flex-wrap justify-center items-center font-Poppins cursor-pointer`}
				>
					<div
						className={`relative card w-[300px] h-[350px] rounded-[20px] shadow-lg transform transition-transform `}
					>
						<div className='card__content rounded-[17px] w-full h-full overflow-hidden'>
							{card && card.seriesphoto && (
								<img
									src={card.seriesphoto}
									alt={card.seriestitle}
									className='h-full w-[300px] object-cover rounded-[17px] transition-all ease-in hover:scale-105'
								/>
							)}
							{card && card.seriestitle && (
								<div className='absolute bottom-0 rounded-b-[17px] text-white font-bold drop-shadow-lg bg-[#02000095] w-full flex items-center justify-around'>
									<h1 className='p-2 pl-[20px] text-[20px]'>
										{card.seriestitle}
									</h1>
									<img
										src={PicturesData.play}
										alt='play'
										className='w-[40px]'
									/>
								</div>
							)}
						</div>
					</div>
				</div>
			</Wrapper>
		</>
	)
}

export default Dorama
