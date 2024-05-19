import React from 'react'
import { useNavigate } from 'react-router-dom'
import Wrapper from '../layout/Wrapper'
import PicturesData from '../PicturesData'
import { useUser } from '../context/UsersContext'

function Card({ card }) {
	const { isPremiumUser } = useUser()
	const navigate = useNavigate()

	const handleCardClick = () => {
		if (card.premium && !isPremiumUser) {
			alert(
				'Bu premium karta. Ushbu kontentga kirish uchun premiumga yangilang.'
			)
		} else {
			navigate(`/card/${card.id}`)
		}
	}

	if (!card) {
		return null
	}

	return (
		<Wrapper>
			<div
				className={`flex flex-col md:flex-row flex-wrap justify-center items-center font-Inter cursor-pointer ${
					card.premium && !isPremiumUser ? 'pointer-events-none' : ''
				}`}
				onClick={handleCardClick}
			>
				<div
					className={`relative card w-[300px] h-[350px] rounded-[20px] shadow-lg transform transition-transform hover:translate-y-[-10px] ${
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
						{card.cardpicture && (
							<img
								src={card.cardpicture}
								alt={card.cardname}
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
							card.cardname && (
								<div className='absolute bottom-0 rounded-b-[17px] text-white font-bold drop-shadow-lg bg-[#02000095] w-full flex items-center justify-around'>
									<h1 className='p-2 pl-[20px] text-[20px]'>{card.cardname}</h1>
									<img
										src={PicturesData.play}
										alt='play'
										className='w-[40px]'
									/>
								</div>
							)
						)}
					</div>
				</div>
			</div>
		</Wrapper>
	)
}

export default Card
