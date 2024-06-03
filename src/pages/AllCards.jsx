import React, { memo, useEffect, useState } from 'react'
import Wrapper from '../layout/Wrapper'
import supabase from '../supabase/data'
import PicturesData from '../PicturesData'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

function AllCards({ user, onSignOut }) {
	const [cards, setCards] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getAllCards()
	}, [])

	async function getAllCards() {
		try {
			const { data, error } = await supabase.from('card').select('*')
			if (error) {
				console.error(error)
			}
			if (data) {
				const nonPremiumCards = data.filter(item => !item.premium)
				setCards(nonPremiumCards)
			}
		} catch (err) {
			console.log(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<Navbar user={user} onSignOut={onSignOut} />
			<div className='w-screen h-screen overflow-auto'>
				{loading ? (
					<div className='h-screen w-screen flex justify-center items-center'>
						<span className='loading loading-ring w-[50px] overflow-hidden bg-white'></span>
					</div>
				) : (
					<Wrapper>
						<div className='flex flex-col items-center md:items-start mt-[100px] gap-5 overflow-auto'>
							<h1 className='text-white font-Poppins text-[25px] font-bold'>
								Barcha Animelar
							</h1>
							<div
								className={`flex flex-col md:flex-row flex-wrap justify-center items-center font-Poppins cursor-pointer gap-[20px]`}
							>
								{cards.map(card => (
									<Link to={`/card/${card.id}`} key={card.id}>
										<div
											className={`relative card w-[250px] h-[350px] rounded-[20px] shadow-lg transform transition-transform hover:translate-y-[-10px] `}
										>
											<div className='card__content rounded-[17px] w-full h-full overflow-hidden'>
												{card.cardpicture && (
													<img
														src={card.cardpicture}
														alt={card.cardname}
														className='h-full w-[300px] object-cover rounded-[17px] transition-all ease-in hover:scale-105'
													/>
												)}

												<div className='absolute bottom-0 rounded-b-[17px] text-white font-bold drop-shadow-lg bg-[#02000095] w-full flex items-center justify-around'>
													<h1 className='p-2 pl-[20px] text-[20px]'>
														{card.cardname}
													</h1>
													<img
														src={PicturesData.play}
														alt='play'
														className='w-[40px]'
													/>
												</div>
											</div>
										</div>
									</Link>
								))}
							</div>
						</div>
					</Wrapper>
				)}
			</div>
		</>
	)
}

export default memo(AllCards)
