import React, { useEffect, useState, memo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import supabase from '../supabase/data'
import Navbar from './Navbar'
import Wrapper from '../layout/Wrapper'

const SingleDoramaCard = memo(({ user, onSignOut }) => {
	const { seriestitle } = useParams()
	const [card, setCard] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [seriesParts, setSeriesParts] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		async function fetchCard() {
			try {
				const { data, error } = await supabase
					.from('series')
					.select('*')
					.eq('seriestitle', seriestitle)
					.single()
				if (error) {
					console.error('Error fetching card:', error)
				} else {
					setCard(data)
				}
			} catch (err) {
				console.error('Error:', err)
			} finally {
				setIsLoading(false)
			}
		}

		fetchCard()
	}, [seriestitle])

	useEffect(() => {
		async function fetchSeriesParts() {
			try {
				if (card) {
					const { data, error } = await supabase
						.from('series_parts')
						.select('*')
						.eq('series_id', card.id)
					if (error) {
						console.error('Error fetching series parts:', error)
					} else {
						data.sort((a, b) => a.series_number - b.series_number)
						setSeriesParts(data)
					}
				}
			} catch (err) {
				console.error('Error:', err)
			}
		}

		if (card) {
			fetchSeriesParts()
		}
	}, [card])

	return (
		<div className='overflow-y-scroll overflow-x-hidden h-screen'>
			<Navbar user={user} onSignOut={onSignOut} />
			{isLoading ? (
				<div className='h-screen w-screen flex justify-center items-center'>
					<span className='loading loading-ring w-[50px] overflow-hidden bg-white'></span>
				</div>
			) : card ? (
				<Wrapper>
					<div className='font-Poppins flex flex-col h-full'>
						<div className='flex flex-col md:flex-row items-center gap-[50px]'>
							<div className='flex flex-col'>
								<h2 className='text-[white] text-[30px] font-bold mt-[80px] md:mt-[100px] mb-[10px]'>
									{card.seriestitle}
								</h2>
								<img
									src={card.seriesphoto}
									alt={card.seriestitle}
									className='w-[300px] h-[400px] rounded-[10px] object-cover'
								/>
							</div>
							<div className='flex flex-col justify-center md:justify-start gap-3 ml-[10px] md:ml-0 md:mt-[150px]'>
								<div className='text-[20px] font-semibold text-white flex items-center gap-10'>
									Yil:{' '}
									<div
										className='form_admin py-1 px-4 shadow-xl cursor-pointer'
										onClick={() =>
											navigate(`/year-category/${card.seriesyear}`)
										}
									>
										{card.seriesyear}
									</div>
								</div>
								<div className='text-[20px] font-semibold text-white flex items-center gap-10'>
									Mamlakat:{' '}
									<div className='form_admin py-1 px-4 shadow-xl'>
										{card.seriesstate}
									</div>
								</div>
								<div className='text-[20px] max-w-[300px] md:max-w-[450px] font-semibold text-white flex items-center gap-10'>
									Janr:{' '}
									<div className='form_admin py-1 px-4 shadow-xl'>
										{card.seriesganre}
									</div>
								</div>
								<div className='text-[20px] font-semibold text-white flex items-center gap-10'>
									Til:{' '}
									<div className='form_admin py-1 px-4 shadow-xl'>
										{card.serieslang}
									</div>
								</div>
								<div className='text-[20px] font-semibold text-white flex items-center gap-10'>
									Yosh:{' '}
									<div className='form_admin py-1 px-4 shadow-xl'>
										{card.seriesage}+
									</div>
								</div>
								<p className='text-white max-w-[300px] md:max-w-[450px]'>
									{card.seriesdescription}
								</p>
							</div>
						</div>
						<div className='mt-[40px] flex justify-center md:justify-start rounded-[10px] w-full'>
							{user ? (
								<div>
									<div className='flex gap-[10px]'>
										{seriesParts.map((part, index) => (
											<Link to={`/parts/${part.id}`} key={part.id}>
												<div className='flex border justify-center items-center text-white w-[60px] h-[30px] text-[14px] rounded-[5px] cursor-pointer border-green-500'>
													{part.series_number} qism
												</div>
											</Link>
										))}
									</div>
								</div>
							) : (
								<button
									className='text-red-500 font-semibold mb-[40px]'
									onClick={() => (window.location.href = '/signin')}
								>
									Videoni tomosha qilish uchun tizimga kiring!
								</button>
							)}
						</div>
					</div>
				</Wrapper>
			) : (
				<div className='h-screen w-screen flex justify-center items-center'>
					<span className='text-white'>Multfilm topilmadi :(</span>
				</div>
			)}
		</div>
	)
})

export default memo(SingleDoramaCard)
