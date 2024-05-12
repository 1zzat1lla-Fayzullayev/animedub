import React, { useEffect, useState } from 'react'
import supabase from '../supabase/data'
import PicturesData from '../PicturesData'
import { Link } from 'react-router-dom'

function Admin() {
	const [isLoggedIn, setIsLoggedIn] = useState(
		JSON.parse(localStorage.getItem('isLoggedIn')) || false
	)
	const [tab, setTab] = useState(1)
	const [formSlider, setFormSlider] = useState({
		title: '',
		description: '',
		picture: '',
	})

	const { title, descreption, picture } = formSlider

	const handleChange = e => {
		const { name, value } = e.target
		setFormSlider(prevState => ({
			...prevState,
			[name]: value,
		}))
	}

	const handleSubmit = async e => {
		if (!title || !descreption || !picture) {
			alert('Please write all documentation')
			return
		}
		e.preventDefault()
		try {
			const { data, error } = await supabase
				.from('sliders')
				.insert({ title, descreption, picture })
				.single()
			if (error) {
				throw error
			}
			if (data) {
				console.log(data)
				setFormSlider({ title: '', descreption: '', picture: '' })
			}
		} catch (error) {
			console.error('Error submitting form:', error.message)
		}
		setFormSlider({
			title: '',
			descreption: '',
			picture: '',
		})
	}

	const handleSubmitCard = async e => {
		e.preventDefault()
		// Similar logic for card submission
	}

	const handleOpenModal = tab => {
		document.getElementById(`my_modal_${tab}`).showModal()
	}

	const handleCloseModal = tab => {
		const modal = document.getElementById(`my_modal_${tab}`)
		if (modal) {
			modal.close()
		}
	}

	useEffect(() => {
		localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))
	}, [isLoggedIn])

	return (
		<div className='absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
			{isLoggedIn ? (
				<>
					<div className='flex justify-start flex-col md:flex-row items-start'>
						<div className='w-full md:w-[360px] md:h-screen flex flex-col items-center md:pb-0 pb-[20px] pt-5 shadow-admin'>
							<Link to={'/'}>
								<h1 className='font-bold cursor-pointer text-white text-[25px]'>
									Anime <span className='slider_h1 font-bold'>DUB</span>
								</h1>
							</Link>
							<div className='mt-[35px] flex flex-col items-start gap-3 w-full px-6'>
								<p
									onClick={() => setTab(1)}
									className={`${
										tab == 1
											? 'bg-[#458FF6] text-[#fff] font-medium '
											: 'bg-[#ececec50] text-[white] '
									} text-lg rounded-[8px] hover:cursor-pointer hover:translate-x-1.5 transition-all py-[8px] px-[25px] w-full mr-5`}
								>
									Swiper
								</p>
								<p
									onClick={() => setTab(2)}
									className={`${
										tab == 2
											? 'bg-[#458FF6] text-[#fff] font-medium '
											: 'bg-[#ececec50] text-[white] '
									} text-lg rounded-[8px] hover:cursor-pointer hover:translate-x-1.5 transition-all py-[8px] px-[25px] w-full mr-5`}
								>
									Card
								</p>
								<p
									onClick={() => setTab(3)}
									className={`${
										tab == 3
											? 'bg-[#458FF6] text-[#fff] font-medium '
											: 'bg-[#ececec50] text-[white] '
									} text-lg rounded-[8px] hover:cursor-pointer hover:translate-x-1.5 transition-all py-[8px] px-[25px] w-full mr-5`}
								>
									nmadrde yana
								</p>
							</div>
						</div>
						<div className='p-5 w-full md:w-[calc(100%-360px)] min-h-screen overflow-auto'>
							{tab === 1 && (
								<div className='container mx-auto'>
									<div className='flex justify-end items-end'>
										<button
											className='btn bg-[#458FF6] border-[#458FF6] text-white hover:bg-[#458FF6] font-Inter mr-[20px] mt-[20px]'
											onClick={() => handleOpenModal(tab)}
										>
											SwiperForm
										</button>
									</div>
									<dialog id={`my_modal_${tab}`} className='modal font-Inter'>
										<div className='modal-box form_admin'>
											<h3 className='font-bold text-[25px] my-[20px] text-center text-white'>
												Swiper Form
											</h3>
											<form
												onSubmit={handleSubmit}
												className='flex flex-col gap-4'
											>
												<input
													type='text'
													name='title'
													placeholder='Title'
													className='input bg-[#17171A] text-white'
													value={title}
													onChange={handleChange}
												/>
												<input
													type='text'
													name='descreption'
													placeholder='Description'
													className='input bg-[#17171A] text-white'
													value={descreption}
													onChange={handleChange}
												/>
												<input
													type='text'
													name='picture'
													placeholder='Picture URL'
													className='input bg-[#17171A] text-white'
													value={picture}
													onChange={handleChange}
												/>
												<button className='btn btn-success text-white'>
													Submit
												</button>
											</form>
											<img
												src={PicturesData.close}
												alt='close'
												onClick={() => handleCloseModal(tab)}
												className='absolute top-2 right-2 w-[30px] cursor-pointer'
											/>
										</div>
									</dialog>
								</div>
							)}
							{tab === 2 && (
								<div className='container mx-auto'>
									<div className='flex justify-end items-end'>
										<button
											className='btn bg-[#458FF6] border-[#458FF6] text-white hover:bg-[#458FF6] font-Inter mr-[20px] mt-[20px]'
											onClick={() => handleOpenModal(tab)}
										>
											CardForm
										</button>
									</div>
									<dialog id={`my_modal_${tab}`} className='modal font-Inter'>
										<div className='modal-box form_admin'>
											<h3 className='font-bold text-[25px] my-[20px] text-center text-white'>
												Card Form
											</h3>
											<form
												onSubmit={handleSubmit}
												className='flex flex-col gap-4'
											>
												<input
													type='text'
													name='title'
													placeholder='Title'
													className='input bg-[#17171A] text-white'
													value={title}
													onChange={handleChange}
												/>
												<input
													type='text'
													name='descreption'
													placeholder='Description'
													className='input bg-[#17171A] text-white'
													value={descreption}
													onChange={handleChange}
												/>
												<input
													type='text'
													name='picture'
													placeholder='Picture URL'
													className='input bg-[#17171A] text-white'
													value={picture}
													onChange={handleChange}
												/>
												<button className='btn btn-success text-white'>
													Submit
												</button>
											</form>
											<img
												src={PicturesData.close}
												alt='close'
												onClick={() => handleCloseModal(tab)}
												className='absolute top-2 right-2 w-[30px] cursor-pointer'
											/>
										</div>
									</dialog>
								</div>
							)}
							{tab === 3 && (
								<div className='container mx-auto'>
									<div className='flex justify-end items-end'>
										<button
											className='btn bg-[#458FF6] border-[#458FF6] text-white hover:bg-[#458FF6] font-Inter mr-[20px] mt-[20px]'
											onClick={() => handleOpenModal(tab)}
										>
											NmadrForm
										</button>
									</div>
									<dialog id={`my_modal_${tab}`} className='modal font-Inter'>
										<div className='modal-box form_admin'>
											<h3 className='font-bold text-[25px] my-[20px] text-center text-white'>
												Nmadr Form
											</h3>
											<form
												onSubmit={handleSubmit}
												className='flex flex-col gap-4'
											>
												<input
													type='text'
													name='title'
													placeholder='Title'
													className='input bg-[#17171A] text-white'
													value={title}
													onChange={handleChange}
												/>
												<input
													type='text'
													name='descreption'
													placeholder='Description'
													className='input bg-[#17171A] text-white'
													value={descreption}
													onChange={handleChange}
												/>
												<input
													type='text'
													name='picture'
													placeholder='Picture URL'
													className='input bg-[#17171A] text-white'
													value={picture}
													onChange={handleChange}
												/>
												<button className='btn btn-success text-white'>
													Submit
												</button>
											</form>
											<img
												src={PicturesData.close}
												alt='close'
												onClick={() => handleCloseModal(tab)}
												className='absolute top-2 right-2 w-[30px] cursor-pointer'
											/>
										</div>
									</dialog>
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
							placeholder='Password'
							className='input'
							onChange={e => {
								if (e.target.value === 'anime') {
									setIsLoggedIn(true)
								}
							}}
						/>
					</div>
				</div>
			)}
		</div>
	)
}

export default Admin
