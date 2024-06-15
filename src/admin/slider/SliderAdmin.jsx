import React, { useEffect, useState } from 'react'
import supabase from '../../supabase/data'
import PicturesData from '../../PicturesData'

function SliderAdmin() {
	const [tab, setTab] = useState(1)
	const [sliderData, setSliderData] = useState([])
	const [editIndex, setEditIndex] = useState(null)
	const [formSlider, setFormSlider] = useState({
		cardname: '',
		description: '',
		picture: '',
		type: '',
	})

	// Fetch slider data from supabase
	const fetchSliderData = async () => {
		try {
			const { data, error } = await supabase.from('sliders').select('*')
			if (error) throw error
			if (data) {
				setSliderData(data)
				console.log(data)
			}
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		fetchSliderData()
	}, [])

	// Handle input change
	const handleChange = e => {
		const { name, value } = e.target
		setFormSlider(prevState => ({ ...prevState, [name]: value }))
	}

	// Handle edit button click
	const handleEdit = (index, data) => {
		if (!data) return
		if (tab === 1) {
			setEditIndex(index)
			setFormSlider({
				cardname: data.cardname,
				description: data.description,
				picture: data.picture,
				type: data.type,
			})
			const modal = document.getElementById(`my_modal_${tab}`)
			if (modal) modal.showModal()
		}
	}

	// Handle form submit
	const handleSubmit = async e => {
		e.preventDefault()
		const { cardname, description, picture, type } = formSlider
		if (!cardname || !description || !picture || !type) {
			throw new Error('Please provide all details for the slider.')
		}

		try {
			if (editIndex !== null) {
				const { data, error } = await supabase
					.from('sliders')
					.update({ cardname, description, picture, type })
					.eq('id', sliderData[editIndex].id)
				if (error) throw error
			} else {
				const { data, error } = await supabase
					.from('sliders')
					.insert({ cardname, description, picture, type })
					.single()
				if (error) throw error
				if (data) {
					console.log(data)
					setSliderData([...sliderData, data])
				}
			}
			setEditIndex(null)
			setFormSlider({ cardname: '', description: '', picture: '', type: '' })
			handleCloseModal(tab)
			fetchSliderData()
		} catch (err) {
			console.log(err)
		}
	}

	// Handle delete button click
	const handleDelete = async (id, index) => {
		try {
			const { error } = await supabase.from('sliders').delete().eq('id', id)
			if (error) throw error
			setSliderData(sliderData.filter((_, i) => i !== index))
		} catch (err) {
			console.log(err)
		}
	}

	// Close modal
	const handleCloseModal = tab => {
		const modal = document.getElementById(`my_modal_${tab}`)
		if (modal) modal.close()
	}

	return (
		<div>
			<dialog id={`my_modal_${tab}`} className='modal font-Poppins'>
				<div className='modal-box form_admin'>
					<h3 className='font-bold text-[25px] my-[20px] text-center text-white'>
						Swiper Form
					</h3>
					<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
						<input
							type='text'
							name='cardname'
							placeholder='Nomi'
							className='input bg-[#17171A] text-white'
							value={formSlider.cardname}
							onChange={handleChange}
						/>
						<input
							type='text'
							name='description'
							placeholder='Malumot'
							className='input bg-[#17171A] text-white'
							value={formSlider.description}
							onChange={handleChange}
						/>
						<input
							type='text'
							name='picture'
							placeholder='Rasm URL'
							className='input bg-[#17171A] text-white'
							value={formSlider.picture}
							onChange={handleChange}
						/>
						<input
							type='text'
							name='type'
							placeholder='card yoki series'
							className='input bg-[#17171A] text-white'
							value={formSlider.type}
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
			<h2 className='text-white font-bold font-Poppins text-[25px] my-[15px]'>
				Swiper Section
			</h2>
			<div className='overflow-y-scroll h-[450px]'>
				<table className='table'>
					<thead>
						<tr className='text-white font-Poppins'>
							<th>Nomi</th>
							<th>Malumot</th>
							<th>Rasm</th>
							<th>Card yoki Series</th>
							<th>Harakat</th>
						</tr>
					</thead>
					<tbody>
						{sliderData.map((item, index) => (
							<tr key={item.id} className='text-white font-Poppins'>
								<td>{item.cardname}</td>
								<td>{item.description}</td>
								<td>
									<img src={item.picture} alt='' className='w-[100px]' />
								</td>
								<td>{item.type}</td>
								<td className='flex justify-center items-center gap-2'>
									<button
										className='bg-[orange] p-2 rounded-[6px]'
										onClick={() => handleEdit(index, item)}
									>
										Tahrirlash
									</button>
									<button
										className='bg-red-500 p-2 rounded-[6px]'
										onClick={() => handleDelete(item.id, index)}
									>
										O'chirish
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default SliderAdmin
