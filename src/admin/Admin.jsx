import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SliderAdmin from './slider/SliderAdmin'
import CardAdmin from './card/CardAdmin'
import UserAdmin from './user/UserAdmin'
import SeriesAdmin from './series/SeriesAdmin'
import SeriesPartAdmin from './seriesPart/SeriesPartAdmin'

// Bismillah

function Admin() {
	const [isLoggedIn, setIsLoggedIn] = useState(
		JSON.parse(localStorage.getItem('isLoggedIn')) || false
	)
	const [tab, setTab] = useState(1)

	const handleOpenModal = tab => {
		const modal = document.getElementById(`my_modal_${tab}`)
		if (modal) modal.showModal()
	}

	useEffect(() => {
		localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))
	}, [isLoggedIn])

	const handleLogOut = () => {
		localStorage.removeItem('isLoggedIn')
		setIsLoggedIn(false)
	}
	return (
		<>
			{isLoggedIn ? (
				<>
					<div className='flex justify-start flex-col md:flex-row items-start'>
						<div className='w-full md:w-[360px] md:h-screen flex flex-col items-center md:pb-0 pb-[20px] pt-5 shadow-admin'>
							<Link to='/'>
								<h1 className='font-bold cursor-pointer text-white text-[25px]'>
									Anime <span className='slider_h1 font-bold'>DUB</span>
								</h1>
							</Link>
							<div className='mt-[35px] flex flex-col items-start gap-3 w-full px-6'>
								{[1, 2, 3, 4, 5].map(item => (
									<p
										key={item}
										onClick={() => setTab(item)}
										className={`${
											tab === item
												? 'bg-[#458FF6] text-[#fff] font-medium '
												: 'bg-[#ececec50] text-[white] '
										} text-lg rounded-[8px] hover:cursor-pointer hover:translate-x-1.5 transition-all py-[8px] px-[25px] w-full mr-5`}
									>
										Jadval {item}
									</p>
								))}
							</div>
						</div>
						<div className='p-5 w-full md:w-[calc(100%-360px)] min-h-screen overflow-auto'>
							{tab === 1 && (
								<div className='container mx-auto'>
									<div className='flex justify-end items-center'>
										<button
											className='btn bg-[#458FF6] border-[#458FF6] text-white hover:bg-[#458FF6] font-Poppins mr-[20px]'
											onClick={() => handleOpenModal(tab)}
										>
											SwiperForm
										</button>
										<button
											className='btn btn-error text-white'
											onClick={handleLogOut}
										>
											Chiqish
										</button>
									</div>
									<SliderAdmin />
								</div>
							)}
							{tab === 2 && (
								<div className='container mx-auto'>
									<div className='flex justify-end items-end'>
										<button
											className='btn bg-[#458FF6] border-[#458FF6] text-white hover:bg-[#458FF6] font-Poppins mr-[20px]'
											onClick={() => handleOpenModal(tab)}
										>
											CardForm
										</button>
										<button
											className='btn btn-error text-white'
											onClick={handleLogOut}
										>
											Chiqish
										</button>
									</div>
									<CardAdmin tab={tab} />
								</div>
							)}
							{tab === 3 && (
								<div className='container mx-auto'>
									<div className='flex justify-end items-center'>
										<button
											className='btn bg-[#458FF6] border-[#458FF6] text-white hover:bg-[#458FF6] font-Poppins mr-[20px]'
											onClick={() => handleOpenModal(tab)}
										>
											UserForm
										</button>
										<button
											className='btn btn-error text-white'
											onClick={handleLogOut}
										>
											Chiqish
										</button>
									</div>
									<UserAdmin tab={tab} />
								</div>
							)}
							{tab === 4 && (
								<div className='container mx-auto'>
									<div className='flex justify-end items-center'>
										<button
											className='btn bg-[#458FF6] border-[#458FF6] text-white hover:bg-[#458FF6] font-Poppins mr-[20px]'
											onClick={() => handleOpenModal(tab)}
										>
											SeriesForm
										</button>
										<button
											className='btn btn-error text-white'
											onClick={handleLogOut}
										>
											Chiqish
										</button>
									</div>
									<SeriesAdmin tab={tab} />
								</div>
							)}
							{tab === 5 && (
								<div className='container mx-auto'>
									<div className='flex justify-end items-center'>
										<button
											className='btn bg-[#458FF6] border-[#458FF6] text-white hover:bg-[#458FF6] font-Poppins mr-[20px]'
											onClick={() => handleOpenModal(tab)}
										>
											SeriesPart
										</button>
										<button
											className='btn btn-error text-white'
											onClick={handleLogOut}
										>
											Chiqish
										</button>
									</div>
									<SeriesPartAdmin tab={tab} />
								</div>
							)}
						</div>
					</div>
				</>
			) : (
				<div className='absolute inset-0 -z-10 h-screen w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'>
					<div className='flex justify-center items-center h-full'>
						<input
							type='password'
							placeholder='Parol'
							className='input font-Poppins'
							onChange={e => {
								if (e.target.value === 'anime') setIsLoggedIn(true)
							}}
						/>
					</div>
				</div>
			)}
		</>
	)
}

export default Admin
