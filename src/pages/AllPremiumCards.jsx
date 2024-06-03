import React, { memo, useEffect, useState } from 'react'
import Wrapper from '../layout/Wrapper'
import supabase from '../supabase/data'
import PicturesData from '../PicturesData'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Card from '../shared/Card'

function AllPremiumCards({ user, onSignOut }) {
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
				const premiumCards = data.filter(item => item.premium)
				setCards(premiumCards)
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
								Barcha Premium Animelar
							</h1>
							<div
								className={`flex flex-col md:flex-row flex-wrap justify-center items-center font-Poppins cursor-pointer gap-[20px]`}
							>
								{cards.map(card => (
									<div
										className='w-[250px] flex md:block justify-center items-center'
										key={card.id}
									>
										<Card key={card.id} card={card} />
									</div>
								))}
							</div>
						</div>
					</Wrapper>
				)}
			</div>
		</>
	)
}

export default memo(AllPremiumCards)
