import React, { useEffect, useState } from 'react'
import supabase from '../supabase/data'
import Navbar from '../components/Navbar'
import PicturesData from '../PicturesData'
import Wrapper from '../layout/Wrapper'
import { Link } from 'react-router-dom'

function AllDorama({ user, onSignOut }) {
	const [dorama, setDorama] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		getAllDorama()
	}, [])

	const getAllDorama = async () => {
		try {
			const { data, error } = await supabase.from('series').select('*')
			if (error) throw error
			if (data) {
				const nonPremiumCards = data.filter(item => !item.premium)
				setDorama(nonPremiumCards)
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
								Barcha Seriallar
							</h1>
							<div
								className={`flex flex-col md:flex-row flex-wrap justify-center items-center font-Poppins cursor-pointer gap-[20px]`}
							>
								{dorama.map(series => (
									<Link to={`/series/${series.seriestitle}`} key={series.id}>
										<div
											className={`relative card w-[250px] h-[350px] rounded-[20px] shadow-lg transform transition-transform hover:translate-y-[-10px] `}
										>
											<div className='card__content rounded-[17px] w-full h-full overflow-hidden'>
												{series.seriesphoto ? (
													<img
														src={series.seriesphoto}
														alt={series.seriestitle}
														className='h-full w-full object-cover rounded-[17px] transition-all ease-in hover:scale-105'
													/>
												) : (
													<div className='h-full w-full bg-gray-200 rounded-[17px] flex items-center justify-center'>
														<span className='text-gray-500'>
															Rasm mavjud emas
														</span>
													</div>
												)}

												<div className='absolute bottom-0 rounded-b-[17px] text-white font-bold drop-shadow-lg bg-[#02000095] w-full flex items-center justify-around'>
													<h1 className='p-2 pl-[20px] text-[20px]'>
														{series.seriestitle}
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

export default AllDorama
