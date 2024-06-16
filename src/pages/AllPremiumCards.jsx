import React, { memo, useEffect, useState } from 'react'
import Wrapper from '../layout/Wrapper'
import supabase from '../supabase/data'
import Navbar from '../components/Navbar'
import Card from '../shared/Card'

function AllPremiumCards({ user, onSignOut }) {
	const [cards, setCards] = useState([])
	const [loading, setLoading] = useState(true)
	const [isPremiumCard, setIsPremiumCard] = useState(true)
	const [series, setSeries] = useState([])

	useEffect(() => {
		getAllCards()
	}, [])

	async function getAllCards() {
		try {
			const { data: cardData, error: cardError } = await supabase
				.from('card')
				.select('*')
			const { data: seriesData, error: seriesError } = await supabase
				.from('series')
				.select('*')

			if (cardData && seriesData) {
				const premiumCards = cardData.filter(item => item.premium)
				const premiumSeries = seriesData.filter(item => item.premium)

				setCards(premiumCards)
				setSeries(premiumSeries)
				setIsPremiumCard(premiumCards.length > 0 || premiumSeries.length > 0)
			}

			setLoading(false)
		} catch (err) {
			console.log(err)
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
						{!isPremiumCard ? (
							<div className='absolute top-0 bottom-0 left-0 right-0 max-w-[350px] h-[100px] m-auto font-Poppins text-red-500 text-[20px]'>
								Premium multfilmlar mavjud emas
							</div>
						) : (
							<div className='flex flex-col items-center md:items-start mt-[100px] gap-5 overflow-auto'>
								<h1 className='text-white font-Poppins text-[25px] font-bold'>
									Barcha Premium Animelar
								</h1>
								<div className='flex flex-col md:flex-row flex-wrap justify-center items-center font-Poppins cursor-pointer gap-[20px]'>
									{cards.map(card => (
										<div
											className='w-[250px] flex md:block justify-center items-center'
											key={card.id}
										>
											<Card card={card} />
										</div>
									))}
								</div>
								<div className='flex flex-col md:flex-row flex-wrap justify-center items-center font-Poppins cursor-pointer gap-[20px] mt-5'>
									{series.map(serie => (
										<div
											className='w-[250px] flex md:block justify-center items-center'
											key={serie.id}
										>
											<Card card={serie} />
										</div>
									))}
								</div>
							</div>
						)}
					</Wrapper>
				)}
			</div>
		</>
	)
}

export default memo(AllPremiumCards)
