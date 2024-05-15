import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PicturesData from '../PicturesData'
import supabase from '../supabase/data'

function Admin() {
	const [isLoggedIn, setIsLoggedIn] = useState(
		JSON.parse(localStorage.getItem('isLoggedIn')) || false
	)
	const [tab, setTab] = useState(1)
	const [sliderData, setSliderData] = useState([])
	const [cardData, setCardData] = useState([])
	const [userData, setUserData] = useState([])
	const [formSlider, setFormSlider] = useState({
		title: '',
		description: '',
		picture: '',
	})
	const [formCard, setFormCard] = useState({
		cardname: '',
		carddescreption: '',
		cardpicture: '',
		cardyear: 0,
		cardstate: '',
		cardgenre: '',
		cardlanguage: '',
		cardage: 0,
		cardvd: '',
	})

	const [userForm, setUserForm] = useState({
		username: '',
		password: '',
		ispayyet: false,
	})

	const [editIndex, setEditIndex] = useState(null)

	useEffect(() => {
		fetchSliderData()
		fetchCardData()
		fetchUserData()
	}, [])

	const fetchSliderData = async () => {
		try {
			const { data, error } = await supabase.from('sliders').select('*')
			if (error) console.error(error)
			if (data != null) setSliderData(data)
		} catch (err) {
			console.error(err)
		}
	}

	const fetchCardData = async () => {
		try {
			const { data, error } = await supabase.from('card').select('*')
			if (error) console.error(error)
			if (data != null) setCardData(data)
		} catch (err) {
			console.error(err)
		}
	}

	const fetchUserData = async () => {
		try {
			const { data, error } = await supabase.from('users').select('*')
			if (error) {
				console.log(error)
			} else {
				setUserData(data)
			}
		} catch (err) {
			console.log(err)
		}
	}

	const handleChange = e => {
		const { name, value } = e.target
		if (tab === 1) {
			setFormSlider(prevState => ({ ...prevState, [name]: value }))
		} else if (tab === 2) {
			setFormCard(prevState => ({ ...prevState, [name]: value }))
		} else if (tab === 3) {
			setUserForm(prevState => ({ ...prevState, [name]: value }))
		}
	}

	const handleFileChange = e => {
		const file = e.target.files[0]
		if (file) {
			const reader = new FileReader()
			reader.onloadend = () => {
				if (tab === 1) {
					setFormSlider(prevState => ({
						...prevState,
						picture: reader.result,
					}))
				} else if (tab === 2) {
					setFormCard(prevState => ({
						...prevState,
						cardvd: reader.result,
					}))
				}
			}
			reader.readAsDataURL(file)
		}
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			if (tab === 1) {
				const { title, description, picture } = formSlider
				if (!title || !description || !picture)
					throw new Error('Please provide all details for the slider.')
				if (editIndex !== null) {
					const { data, error } = await supabase
						.from('sliders')
						.update({ title, description, picture })
						.eq('id', sliderData[editIndex].id)
					if (error) throw error
					if (data) {
						console.log(data)
						setEditIndex(null)
						setFormSlider({ title: '', description: '', picture: '' })
					}
				} else {
					const { data, error } = await supabase
						.from('sliders')
						.insert({ title, description, picture })
						.single()
					if (error) throw error
					if (data) {
						console.log(data)
						setFormSlider({ title: '', description: '', picture: '' })
					}
				}
			} else if (tab === 2) {
				const {
					cardname,
					carddescreption,
					cardpicture,
					cardyear,
					cardstate,
					cardgenre,
					cardlanguage,
					cardage,
					cardvd,
				} = formCard
				if (
					!cardname ||
					!carddescreption ||
					!cardpicture ||
					!cardyear ||
					!cardstate ||
					!cardgenre ||
					!cardlanguage ||
					!cardage ||
					!cardvd
				)
					throw new Error('Please provide all details for the card.')
				if (editIndex !== null) {
					const { data, error } = await supabase
						.from('card')
						.update({
							cardname,
							carddescreption,
							cardpicture,
							cardyear,
							cardstate,
							cardgenre,
							cardlanguage,
							cardage,
							cardvd,
						})
						.eq('id', cardData[editIndex].id)
					if (error) throw error
					if (data) {
						console.log(data)
						setEditIndex(null)
						setFormCard({
							cardname: '',
							carddescreption: '',
							cardpicture: '',
							cardyear: 0,
							cardstate: '',
							cardgenre: '',
							cardlanguage: '',
							cardage: 0,
							cardvd: '',
						})
					}
				} else {
					const { data, error } = await supabase
						.from('card')
						.insert({
							cardname,
							carddescreption,
							cardpicture,
							cardyear,
							cardstate,
							cardgenre,
							cardlanguage,
							cardage,
							cardvd,
						})
						.single()
					if (error) throw error
					if (data) {
						console.log(data)
						setFormCard({
							cardname: '',
							carddescreption: '',
							cardpicture: '',
							cardyear: 0,
							cardstate: '',
							cardgenre: '',
							cardlanguage: '',
							cardage: 0,
							cardvd: '',
						})
					}
				}
			} else if (tab === 3) {
				const { username, password, ispayyet } = userForm
				if (!username || !password) {
					throw new Error('Please provide all details for the form.')
				}
				if (editIndex !== null) {
					const { data, error } = await supabase
						.from('users')
						.update({ username, password, ispayyet })
						.eq('id', userData[editIndex].id)
					if (error) throw error
					if (data) {
						console.log(data)
						setEditIndex(null)
						setUserForm({
							username: '',
							password: '',
							ispayyet: false,
						})
					}
				} else {
					const { data, error } = await supabase
						.from('users')
						.insert({ username, password, ispayyet })
						.single()
					if (error) throw error
					if (data) {
						console.log(data)
						setUserForm({
							username: '',
							password: '',
							ispayyet: false,
						})
					}
				}
			}
			handleCloseModal(tab)
			window.location.reload()
		} catch (error) {
			console.error('Error submitting form:', error.message)
		}
	}

	const handleEdit = (index, data) => {
		if (tab === 1) {
			setEditIndex(index)
			setFormSlider({
				title: data.title,
				description: data.description,
				picture: data.picture,
			})
			const modal = document.getElementById(`my_modal_${tab}`)
			if (modal) modal.showModal()
		} else if (tab === 2) {
			setEditIndex(index)
			setFormCard({
				cardname: data.cardname,
				carddescreption: data.carddescreption,
				cardpicture: data.cardpicture,
				cardyear: data.cardyear,
				cardstate: data.cardstate,
				cardgenre: data.cardgenre,
				cardlanguage: data.cardlanguage,
				cardage: data.cardage,
				cardvd: data.cardvd,
			})
			const modal = document.getElementById(`my_modal_${tab}`)
			if (modal) modal.showModal()
		} else if (tab === 3) {
			setEditIndex(index)
			setUserForm({
				username: data.username,
				password: data.password,
				ispayyet: data.ispayyet,
			})
			const modal = document.getElementById(`my_modal_${tab}`)
			if (modal) modal.showModal()
		}
	}

	const handleDelete = async (id, index) => {
		try {
			if (tab === 1) {
				const { error } = await supabase.from('sliders').delete().eq('id', id)
				if (error) throw error
				const newData = [...sliderData]
				newData.splice(index, 1)
				setSliderData(newData)
			} else if (tab === 2) {
				const { error } = await supabase.from('card').delete().eq('id', id)
				if (error) throw error
				const newData = [...cardData]
				newData.splice(index, 1)
				setCardData(newData)
			} else if (tab === 3) {
				const { error } = await supabase.from('users').delete().eq('id', id)
				if (error) throw error
				const newData = [...userData]
				newData.splice(index, 1)
				setUserData(newData)
			}
		} catch (error) {
			console.error('Error deleting record:', error.message)
		}
	}

	const handleOpenModal = tab => {
		const modal = document.getElementById(`my_modal_${tab}`)
		if (modal) modal.showModal()
	}

	const handleCloseModal = tab => {
		const modal = document.getElementById(`my_modal_${tab}`)
		if (modal) modal.close()
	}

	useEffect(() => {
		localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn))
	}, [isLoggedIn])

	const handleLogOut = () => {
		localStorage.removeItem('isLoggedIn')
		setIsLoggedIn(false)
	}
	return (
		<div className='absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
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
								{[1, 2, 3].map(item => (
									<p
										key={item}
										onClick={() => setTab(item)}
										className={`${
											tab === item
												? 'bg-[#458FF6] text-[#fff] font-medium '
												: 'bg-[#ececec50] text-[white] '
										} text-lg rounded-[8px] hover:cursor-pointer hover:translate-x-1.5 transition-all py-[8px] px-[25px] w-full mr-5`}
									>
										Table {item}
									</p>
								))}
							</div>
						</div>
						<div className='p-5 w-full md:w-[calc(100%-360px)] min-h-screen overflow-auto'>
							{tab === 1 && (
								<div className='container mx-auto'>
									<div className='flex justify-end items-center'>
										<button
											className='btn bg-[#458FF6] border-[#458FF6] text-white hover:bg-[#458FF6] font-Inter mr-[20px]'
											onClick={() => handleOpenModal(tab)}
										>
											SwiperForm
										</button>
										<button
											className='btn btn-error text-white'
											onClick={handleLogOut}
										>
											Log out
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
													value={formSlider.title}
													onChange={handleChange}
												/>
												<input
													type='text'
													name='description'
													placeholder='Description'
													className='input bg-[#17171A] text-white'
													value={formSlider.description}
													onChange={handleChange}
												/>
												<input
													type='text'
													name='picture'
													placeholder='Photo URL'
													className='input bg-[#17171A] text-white'
													value={formSlider.picture}
													onChange={handleChange}
												/>
												<button className='btn btn-success text-white'>
													{editIndex !== null ? 'Update' : 'Submit'}
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
									<h2 className='text-white font-bold font-Inter text-[25px] my-[15px]'>
										Swiper Section
									</h2>
									<div className='overflow-y-scroll h-[450px]'>
										<table className='table'>
											<thead>
												<tr className='text-white font-Montserrat'>
													<th>Name</th>
													<th>Description</th>
													<th>Picture</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{sliderData.map((item, index) => (
													<tr key={item.id} className='text-white font-Inter'>
														<td>{item.title}</td>
														<td>{item.description}</td>
														<td>
															<img
																src={item.picture}
																alt=''
																className='w-[100px]'
															/>
														</td>
														<td className='flex justify-center items-center gap-2'>
															<button
																className='bg-[orange] p-2 rounded-[6px]'
																onClick={() => handleEdit(index, item)}
															>
																Edit
															</button>
															<button
																className='bg-red-500 p-2 rounded-[6px]'
																onClick={() => handleDelete(item.id, index)}
															>
																Delete
															</button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							)}
							{tab === 2 && (
								<div className='container mx-auto'>
									<div className='flex justify-end items-end'>
										<button
											className='btn bg-[#458FF6] border-[#458FF6] text-white hover:bg-[#458FF6] font-Inter mr-[20px]'
											onClick={() => handleOpenModal(tab)}
										>
											CardForm
										</button>
										<button
											className='btn btn-error text-white'
											onClick={handleLogOut}
										>
											Log out
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
													name='cardname'
													placeholder='Title'
													className='input bg-[#17171A] text-white'
													value={formCard.cardname}
													onChange={handleChange}
												/>
												<input
													type='text'
													name='carddescreption'
													placeholder='Description'
													className='input bg-[#17171A] text-white'
													value={formCard.carddescreption}
													onChange={handleChange}
												/>
												<input
													type='text'
													name='cardpicture'
													placeholder='Photo URL'
													className='input bg-[#17171A] text-white'
													value={formCard.cardpicture}
													onChange={handleChange}
												/>
												<input
													type='number'
													name='cardyear'
													placeholder='Year'
													className='input bg-[#17171A] text-white'
													value={formCard.cardyear}
													onChange={handleChange}
												/>
												<input
													type='text'
													name='cardstate'
													placeholder='State'
													className='input bg-[#17171A] text-white'
													value={formCard.cardstate}
													onChange={handleChange}
												/>
												<input
													type='text'
													name='cardgenre'
													placeholder='Genre'
													className='input bg-[#17171A] text-white'
													value={formCard.cardgenre}
													onChange={handleChange}
												/>
												<input
													type='text'
													name='cardlanguage'
													placeholder='Language'
													className='input bg-[#17171A] text-white'
													value={formCard.cardlanguage}
													onChange={handleChange}
												/>
												<input
													type='number'
													name='cardage'
													placeholder='Age'
													className='input bg-[#17171A] text-white'
													value={formCard.cardage}
													onChange={handleChange}
												/>
												<input
													type='file'
													accept='video/*'
													name='cardvd'
													onChange={handleFileChange}
												/>
												<button className='btn btn-success text-white'>
													{editIndex !== null ? 'Update' : 'Submit'}
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
									<h2 className='text-white font-bold font-Inter text-[25px] my-[15px]'>
										Card Section
									</h2>
									<div className='overflow-y-scroll h-[450px]'>
										<table className='table'>
											<thead>
												<tr className='text-white font-Montserrat'>
													<th>Name</th>
													<th>Description</th>
													<th>Picture</th>
													<th>Year</th>
													<th>State</th>
													<th>Genre</th>
													<th>Language</th>
													<th>Age</th>
													<th>Video</th>
													<th>Action</th>
												</tr>
											</thead>
											<tbody>
												{cardData.map((item, index) => (
													<tr key={item.id} className='text-white font-Inter'>
														<td>{item.cardname}</td>
														<td>{item.carddescreption}</td>
														<td>
															<img
																src={item.cardpicture}
																alt='404'
																className='w-[100px]'
															/>
														</td>
														<td>{item.cardyear}</td>
														<td>{item.cardstate}</td>
														<td>{item.cardgenre}</td>
														<td>{item.cardlanguage}</td>
														<td>{item.cardage}</td>
														<td>
															<video src={item.cardvd}></video>
														</td>
														<td className='flex justify-center items-center gap-2'>
															<button
																className='bg-[orange] p-2 rounded-[6px]'
																onClick={() => handleEdit(index, item)}
															>
																Edit
															</button>
															<button
																className='bg-red-500 p-2 rounded-[6px]'
																onClick={() => handleDelete(item.id, index)}
															>
																Delete
															</button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</div>
							)}
							{tab === 3 && (
								<div className='container mx-auto'>
									<div className='flex justify-end items-center'>
										<button
											className='btn bg-[#458FF6] border-[#458FF6] text-white hover:bg-[#458FF6] font-Inter mr-[20px]'
											onClick={() => handleOpenModal(tab)}
										>
											UserForm
										</button>
										<button
											className='btn btn-error text-white'
											onClick={handleLogOut}
										>
											Log out
										</button>
									</div>
									<dialog id={`my_modal_${tab}`} className='modal font-Inter'>
										<div className='modal-box form_admin'>
											<h3 className='font-bold text-[25px] my-[20px] text-center text-white'>
												User Form
											</h3>
											<form
												onSubmit={handleSubmit}
												className='flex flex-col gap-4'
											>
												<input
													type='text'
													name='username'
													placeholder='Username'
													className='input bg-[#17171A] text-white'
													value={userForm.username}
													onChange={handleChange}
												/>
												<input
													type='password'
													name='password'
													placeholder='Password'
													className='input bg-[#17171A] text-white'
													value={userForm.password}
													onChange={handleChange}
												/>
												<div className='flex items-center gap-2'>
													<label htmlFor='ispayyet' className='text-white'>
														Is Payyet
													</label>
													<input
														type='checkbox'
														name='ispayyet'
														checked={userForm.ispayyet}
														onChange={e =>
															setUserForm(prevState => ({
																...prevState,
																ispayyet: e.target.checked,
															}))
														}
													/>
												</div>

												<button className='btn btn-success text-white'>
													{editIndex !== null ? 'Update' : 'Submit'}
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
									<h2 className='text-white font-bold font-Inter text-[25px] my-[15px]'>
										User Section
									</h2>
									<div className='overflow-y-scroll h-[450px]'>
										<table className='table'>
											<thead>
												<tr className='text-white font-Montserrat'>
													<th>Username</th>
													<th>Password</th>
													<th>ispayyet</th>
												</tr>
											</thead>
											<tbody>
												{userData.map((item, index) => (
													<tr key={item.id} className='text-white font-Inter'>
														<td>{item.username}</td>
														<td>{item.password}</td>
														<td>{item.ispayyet ? 'true' : 'false'}</td>
														<td className='flex justify-center items-center gap-2'>
															<button
																className='bg-[orange] p-2 rounded-[6px]'
																onClick={() => handleEdit(index, item)}
															>
																Edit
															</button>
															<button
																className='bg-red-500 p-2 rounded-[6px]'
																onClick={() => handleDelete(item.id, index)}
															>
																Delete
															</button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
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
							className='input font-Inter'
							onChange={e => {
								if (e.target.value === 'anime') setIsLoggedIn(true)
							}}
						/>
					</div>
				</div>
			)}
		</div>
	)
}

export default Admin
