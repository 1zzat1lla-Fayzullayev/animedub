import React, { useEffect, useState } from 'react'
import supabase from '../../supabase/data'
import PicturesData from '../../PicturesData'

function CardAdmin({ tab, setTab }) {
	const [cardData, setCardData] = useState([])
	const [editIndex, setEditIndex] = useState(null)
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
		premium: false,
	})

	const fetchCardData = async () => {
		try {
			const { data, error } = await supabase.from('card').select('*')
			if (error) console.error(error)
			if (data) setCardData(data)
		} catch (err) {
			console.error(err)
		}
	}

	useEffect(() => {
		fetchCardData()
	}, [])

	const handleChange = e => {
		const { name, value } = e.target
		setFormCard(prevState => ({ ...prevState, [name]: value }))
	}

	const handleEdit = (index, data) => {
		if (!data) return
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
			premium: data.premium,
		})
		const modal = document.getElementById('card_modal')
		if (modal) modal.showModal()
	}

	const handleSubmit = async e => {
		e.preventDefault()
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
			premium,
		} = formCard

		if (
			!cardname ||
			!carddescreption ||
			!cardpicture ||
			!cardage ||
			!cardyear ||
			!cardgenre ||
			!cardlanguage ||
			!cardstate ||
			!cardvd
		) {
			console.error('Please provide all details for the card.')
			return
		}

		try {
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
						premium,
					})
					.eq('id', cardData[editIndex].id)
				if (error) throw error
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
						premium,
					})
					.single()
				if (error) throw error
				if (data) {
					setCardData([...cardData, data])
				}
			}
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
				premium: false,
			})
			handleCloseModal()
			fetchCardData()
		} catch (err) {
			console.error(err)
		}
	}

	const handleDelete = async (id, index) => {
		try {
			const { error } = await supabase.from('card').delete().eq('id', id)
			if (error) throw error
			setCardData(cardData.filter((_, i) => i !== index))
		} catch (err) {
			console.error(err)
		}
	}

	const handleCloseModal = () => {
		const modal = document.getElementById('card_modal')
		if (modal) modal.close()
	}

	return (
		<div>
			<dialog id='card_modal' className='modal font-Poppins'>
				<div className='modal-box form_admin'>
					<h3 className='font-bold text-[25px] my-[20px] text-center text-white'>
						Card Form
					</h3>
					<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
						<input
							type='text'
							name='cardname'
							placeholder='Nom'
							className='input bg-[#17171A] text-white'
							value={formCard.cardname}
							onChange={handleChange}
						/>
						<input
							type='text'
							name='carddescreption'
							placeholder='Tavsif'
							className='input bg-[#17171A] text-white'
							value={formCard.carddescreption}
							onChange={handleChange}
						/>
						<input
							type='text'
							name='cardpicture'
							placeholder='Rasm URL'
							className='input bg-[#17171A] text-white'
							value={formCard.cardpicture}
							onChange={handleChange}
						/>
						<input
							type='number'
							name='cardyear'
							placeholder='Yil'
							className='input bg-[#17171A] text-white'
							value={formCard.cardyear}
							onChange={handleChange}
						/>
						<input
							type='text'
							name='cardstate'
							placeholder='Mamlakat'
							className='input bg-[#17171A] text-white'
							value={formCard.cardstate}
							onChange={handleChange}
						/>
						<input
							type='text'
							name='cardgenre'
							placeholder='Janr'
							className='input bg-[#17171A] text-white'
							value={formCard.cardgenre}
							onChange={handleChange}
						/>
						<input
							type='text'
							name='cardlanguage'
							placeholder='Til'
							className='input bg-[#17171A] text-white'
							value={formCard.cardlanguage}
							onChange={handleChange}
						/>
						<input
							type='number'
							name='cardage'
							placeholder='Yosh'
							className='input bg-[#17171A] text-white'
							value={formCard.cardage}
							onChange={handleChange}
						/>
						<input
							type='text'
							name='cardvd'
							placeholder='Video URL'
							className='input bg-[#17171A] text-white'
							value={formCard.cardvd}
							onChange={handleChange}
						/>
						<div className='flex items-center gap-2'>
							<label htmlFor='premium' className='text-white'>
								Premium
							</label>
							<select
								name='premium'
								value={formCard.premium ? 'Ha' : "Yo'q"}
								onChange={e =>
									setFormCard(prevState => ({
										...prevState,
										premium: e.target.value === 'Ha',
									}))
								}
								className='px-4 py-2 rounded border border-gray-400 bg-gray-900 text-white text-base focus:outline-none focus:border-blue-500 focus:shadow-outline-blue'
							>
								<option value='Ha'>Ha</option>
								<option value="Yo'q">Yo'q</option>
							</select>
						</div>
						<button className='btn btn-success text-white'>
							{editIndex !== null ? 'Yangilash' : 'Yuborish'}
						</button>
					</form>
					<img
						src={PicturesData.close}
						alt='close'
						onClick={handleCloseModal}
						className='absolute top-2 right-2 w-[30px] cursor-pointer'
					/>
				</div>
			</dialog>
			<h2 className='text-white font-bold font-Poppins text-[25px] my-[15px]'>
				Card Section
			</h2>
			<div className='overflow-y-scroll h-[450px]'>
				<table className='table'>
					<thead>
						<tr className='text-white font-Poppins'>
							<th>Nom</th>
							<th>Tavsif</th>
							<th>Rasm</th>
							<th>Yil</th>
							<th>Mamlakat</th>
							<th>Janr</th>
							<th>Til</th>
							<th>Yosh</th>
							<th>Video</th>
							<th>Premium</th>
							<th>Harakat</th>
						</tr>
					</thead>
					<tbody>
						{cardData.map((item, index) => (
							<tr key={item.id} className='text-white font-Poppins'>
								<td>{item.cardname}</td>
								<td>{item.carddescreption}</td>
								<td>
									<img src={item.cardpicture} alt='404' className='w-[100px]' />
								</td>
								<td>{item.cardyear}</td>
								<td>{item.cardstate}</td>
								<td>{item.cardgenre}</td>
								<td>{item.cardlanguage}</td>
								<td>{item.cardage}</td>
								<td>
									<iframe
										src={item.cardvd}
										className='w-[50px] h-[50px]'
									></iframe>
								</td>
								<td>{item.premium ? 'Ha' : "Yo'q"}</td>
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

export default CardAdmin
