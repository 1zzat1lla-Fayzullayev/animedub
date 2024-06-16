import React, { memo } from 'react'
import { useUser } from '../context/UsersContext'
import Wrapper from '../layout/Wrapper'
import PicturesData from '../PicturesData'
import { useNavigate } from 'react-router-dom'

function Card({ card }) {
	const { isPremiumUser } = useUser()
	const navigate = useNavigate()

	const handleCardClick = () => {
		if (card.premium && !isPremiumUser) {
			alert(
				'Bu premium karta. Ushbu kontentga kirish uchun premiumga yangilang.'
			)
		} else {
			const title = card.cardname || card.seriestitle
			if (card.cardname) {
				navigate(`/card/${title}`)
			} else if (card.seriestitle) {
				navigate(`/series/${title}`)
			}
		}
	}

	if (!card) {
		return null
	}

	return (
		<Wrapper>
			<div
				className={`flex flex-col md:flex-row flex-wrap justify-center items-center font-Poppins cursor-pointer ${
					card.premium && !isPremiumUser ? 'pointer-events-none' : ''
				}`}
				onClick={handleCardClick}
			>
				<div
					className={`relative card w-[300px] h-[350px] rounded-[20px] shadow-lg transform transition-transform ${
						card.premium && !isPremiumUser ? 'opacity-25' : ''
					}`}
				>
					{card.premium && !isPremiumUser && (
						<img
							src={PicturesData.premium}
							alt='premium'
							className='absolute z-[10] w-[35px] blur_div p-1 rounded-bl-[5px] rounded-tr-[15px] right-[5px]'
						/>
					)}
					<div className='card__content rounded-[17px] w-full h-full overflow-hidden'>
						{(card.cardpicture || card.seriesphoto) && (
							<img
								src={card.cardpicture || card.seriesphoto}
								alt={card.cardname || card.seriestitle || 'Card Image'}
								className='h-full w-[300px] object-cover rounded-[17px] transition-all ease-in hover:scale-105'
							/>
						)}
						{card.premium && !isPremiumUser ? (
							<div className='absolute top-[50%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-75 p-3 rounded-md'>
								<h1 className='text-lg font-semibold text-green-500 text-center'>
									Bu premium karta
								</h1>
							</div>
						) : (
							<div className='absolute bottom-0 rounded-b-[17px] text-white font-bold drop-shadow-lg bg-[#02000095] w-full p-2 flex justify-between items-center'>
								<h1 className='text-[20px]'>
									{card.cardname || card.seriestitle}
								</h1>
								<img src={PicturesData.play} alt='play' className='w-[40px]' />
							</div>
						)}
					</div>
				</div>
			</div>
		</Wrapper>
	)
}

export default memo(Card)
