import React, { useEffect, useState } from 'react'
import supabase from '../supabase/data'
import PicturesData from '../PicturesData'

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

	const handleOpenModal = () => {
		document.getElementById('my_modal_1').showModal()
	}

	const handleCloseModal = () => {
		const modal = document.getElementById('my_modal_1')
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
					<div className='flex flex-col md:flex-row items-start justify-between'>
						<div className='w-full md:w-[400px] h-[300px] md:h-[100vh] navbar_anima'>
							<h1 className='font-bold cursor-pointer text-center text-[25px] text-white'>
								Anime <span className='slider_h1 font-bold'>DUB</span>
							</h1>
						</div>
						{/*  */}
						<dialog id='my_modal_1' className='modal font-Inter'>
							<div className='modal-box form_admin'>
								<h3 className='font-bold text-[25px] my-[20px] text-center text-white'>
									Swiper Form
								</h3>
								<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
									<button className='btn btn-success text-white'>Submit</button>
								</form>
								<img
									src={PicturesData.close}
									alt='close'
									onClick={handleCloseModal}
									className='absolute top-2 right-2 w-[30px] cursor-pointer'
								/>
							</div>
						</dialog>

						<button
							className='btn btn-primary font-Inter mr-[20px] mt-[20px]'
							onClick={handleOpenModal}
						>
							SwiperForm
						</button>
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
