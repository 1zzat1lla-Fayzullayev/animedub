import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../supabase/data'
import Navbar from './Navbar'
import Wrapper from '../layout/Wrapper'
import { useUser } from '../context/UsersContext'
import PicturesData from '../PicturesData'

function SingleCard({ user, onSignOut }) {
	const { id } = useParams()
	const [card, setCard] = useState(null)
	const { isPremiumUser } = useUser()

	useEffect(() => {
		async function fetchCard() {
			try {
				const { data, error } = await supabase
					.from('card')
					.select('*')
					.eq('id', id)
					.single()
				if (error) {
					console.error(error)
				} else {
					setCard(data)
				}
			} catch (err) {
				console.error(err)
			}
		}

		fetchCard()
	}, [id])

	if (!card) {
		return (
			<div>
				<div className='h-screen w-screen flex justify-center items-center'>
					<span className='loading loading-ring w-[50px] overflow-hidden bg-white'></span>
				</div>
			</div>
		)
	}

	if (isPremiumUser) {
		return (
			<>
				<Navbar user={user} onSignOut={onSignOut} />
				<Wrapper>
					<div className='font-Montserrat flex flex-col h-screen w-screen'>
						<div className='flex flex-col md:flex-row items-center gap-[50px]'>
							<div className='flex flex-col'>
								<h2 className='text-[white] text-[30px] font-bold mt-[80px] md:mt-[100px] mb-[10px]'>
									{card.cardname}
								</h2>
								<img
									src={card.cardpicture}
									alt={card.cardname}
									className='w-[300px] h-[400px] rounded-[10px] object-cover'
								/>
							</div>
							<div className='flex flex-col justify-center md:justify-start gap-3'>
								<div className='text-[20px] font-semibold text-white flex items-center gap-10'>
									Yil:{' '}
									<div className='form_admin py-1 px-4 shadow-xl'>
										{card.cardyear}
									</div>
								</div>
								<div className='text-[20px] font-semibold text-white flex items-center gap-10'>
									Mamlakat:{' '}
									<div className='form_admin py-1 px-4 shadow-xl'>
										{card.cardstate}
									</div>
								</div>
								<div className='text-[20px] font-semibold text-white flex items-center gap-10'>
									Janr:{' '}
									<div className='form_admin py-1 px-4 shadow-xl'>
										{card.cardgenre}
									</div>
								</div>
								<div className='text-[20px] font-semibold text-white flex items-center gap-10'>
									Til:{' '}
									<div className='form_admin py-1 px-4 shadow-xl'>
										{card.cardlanguage}
									</div>
								</div>
								<div className='text-[20px] font-semibold text-white flex items-center gap-10'>
									Yosh:{' '}
									<div className='form_admin py-1 px-4 shadow-xl'>
										{card.cardage}
									</div>
								</div>
								<p className='text-white'>{card.carddescreption}</p>
							</div>
						</div>
						<div className='mt-[40px] flex justify-center md:justify-start rounded-[10px]'>
							<video
								src={card.cardvd}
								controls
								className='w-full md:w-[800px] h-[400px] rounded-[10px] shadow-lg'
							></video>
						</div>
					</div>
				</Wrapper>
			</>
		)
	}

	return (
		<>
			<Navbar user={user} onSignOut={onSignOut} />
			<Wrapper>
				<div className='font-Montserrat flex flex-col h-screen w-screen'>
					<div className='flex flex-col md:flex-row items-center gap-[50px]'>
						<div className='flex flex-col'>
							<h2 className='text-[white] text-[30px] font-bold mt-[80px] md:mt-[100px] mb-[10px]'>
								{card.cardname}
							</h2>
							<img
								src={card.cardpicture}
								alt={card.cardname}
								className='w-[300px] h-[400px] rounded-[10px] object-cover'
							/>
						</div>
						<div className='flex flex-col justify-center md:justify-start gap-3'>
							<div className='text-[20px] font-semibold text-white flex items-center gap-10'>
								Yil:{' '}
								<div className='form_admin py-1 px-4 shadow-xl'>
									{card.cardyear}
								</div>
							</div>
							<div className='text-[20px] font-semibold text-white flex items-center gap-10'>
								Mamlakat:{' '}
								<div className='form_admin py-1 px-4 shadow-xl'>
									{card.cardstate}
								</div>
							</div>
							<div className='text-[20px] font-semibold text-white flex items-center gap-10'>
								Janr:{' '}
								<div className='form_admin py-1 px-4 shadow-xl'>
									{card.cardgenre}
								</div>
							</div>
							<div className='text-[20px] font-semibold text-white flex items-center gap-10'>
								Til:{' '}
								<div className='form_admin py-1 px-4 shadow-xl'>
									{card.cardlanguage}
								</div>
							</div>
							<div className='text-[20px] font-semibold text-white flex items-center gap-10'>
								Yosh:{' '}
								<div className='form_admin py-1 px-4 shadow-xl'>
									{card.cardage}
								</div>
							</div>
							<p className='text-white'>{card.carddescreption}</p>
						</div>
					</div>
					<div className='mt-[40px] flex justify-center md:justify-start rounded-[10px]'>
						{user ? (
							<video
								src={card.cardvd}
								controls
								className='w-full md:w-[800px] h-[400px] rounded-[10px] shadow-lg'
							></video>
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
		</>
	)
}

export default SingleCard
