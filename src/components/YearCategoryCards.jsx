import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../supabase/data'
import { Link } from 'react-router-dom'
import Wrapper from '../layout/Wrapper'
import Navbar from './Navbar'

function YearCategoryCards({ user, onSignOut }) {
	const { year } = useParams()
	const [cards, setCards] = useState([])
	const [loading, setLoading] = useState(true) // Initialize to true

	useEffect(() => {
		async function fetchCards() {
			try {
				const { data, error } = await supabase
					.from('card')
					.select('*')
					.eq('cardyear', year)
					.order('cardyear', { ascending: true })
				if (error) {
					console.error('Error fetching related cards:', error)
				} else {
					setCards(data)
				}
			} catch (err) {
				console.error('Error:', err)
			} finally {
				setLoading(false) // Set loading to false once data is fetched
			}
		}

		fetchCards()
	}, [year])

	return (
		<>
			<Navbar user={user} onSignOut={onSignOut} />
			<div className='flex justify-center items-start w-screen h-screen'>
				<Wrapper>
					<div className='flex flex-col items-center mt-[120px]'>
						{loading ? (
							<div className='flex justify-center items-center h-[80vh]'>
								<span className='loading loading-dots loading-lg bg-[#57f81dbd]'></span>
							</div>
						) : (
							<>
								<h1 className='text-white font-Montserrat font-bold text-[25px]'>
									Yil: {year}
								</h1>
								<div className='flex flex-wrap justify-center'>
									{cards.map(card => (
										<div key={card.id} className='p-4 font-Montserrat'>
											<Link to={`/card/${card.id}`}>
												<img
													src={card.cardpicture}
													alt={card.cardname}
													className='w-[200px] h-[300px] rounded-[10px] object-cover transition-all duration-75 ease-in hover:scale-105'
												/>
												<div className='text-center text-white mt-2'>
													{card.cardname}
												</div>
											</Link>
										</div>
									))}
								</div>
							</>
						)}
					</div>
				</Wrapper>
			</div>
		</>
	)
}

export default YearCategoryCards