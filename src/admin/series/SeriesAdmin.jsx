import React, { useEffect, useState } from 'react'
import supabase from '../../supabase/data'
import PicturesData from '../../PicturesData'

function SeriesAdmin({ tab }) {
	const [seriesData, setSeriesData] = useState([])
	const [editIndex, setEditIndex] = useState(null)
	const [seriesForm, setSeriesForm] = useState({
		seriestitle: '',
		seriesdescription: '',
		seriesphoto: '',
		seriesyear: 0,
		seriesstate: '',
		seriesganre: '',
		serieslang: '',
		seriesage: 0,
		premium: false,
	})

	const fetchSeries = async () => {
		const { data, error } = await supabase
			.from('series')
			.select('*, series_parts(*)')
		if (error) console.error(error)
		else setSeriesData(data)
	}

	useEffect(() => {
		fetchSeries()
	}, [])

	const handleChange = e => {
		const { name, value } = e.target
		setSeriesForm(prevState => ({ ...prevState, [name]: value }))
	}

	const handleEdit = (index, data) => {
		if (!data) return
		setEditIndex(index)
		setSeriesForm({
			seriestitle: data.seriestitle || '',
			seriesdescription: data.seriesdescription || '',
			seriesage: data.seriesage || 0,
			seriesganre: data.seriesganre || '',
			serieslang: data.serieslang || '',
			seriesphoto: data.seriesphoto || '',
			seriesstate: data.seriesstate || '',
			seriesyear: data.seriesyear || 0,
		})
		const modal = document.getElementById(`my_modal_${tab}`)
		if (modal) modal.showModal()
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const {
			seriestitle,
			seriesdescription,
			seriesage,
			seriesganre,
			serieslang,
			seriesstate,
			seriesphoto,
			seriesyear,
			premium,
		} = seriesForm

		if (
			!seriestitle ||
			!seriesdescription ||
			!seriesage ||
			!seriesganre ||
			!seriesstate ||
			!seriesphoto ||
			!seriesyear ||
			!serieslang
		) {
			console.error('Please provide all details for the form.')
			return
		}

		try {
			if (editIndex !== null) {
				const { data, error } = await supabase
					.from('series')
					.update({
						seriestitle,
						seriesdescription,
						seriesage,
						seriesganre,
						serieslang,
						seriesphoto,
						seriesstate,
						seriesyear,
						premium,
					})
					.eq('id', seriesData[editIndex].id)

				if (error) throw error

				setSeriesData(prevData => {
					const updatedData = [...prevData]
					if (data && data.length > 0) {
						updatedData[editIndex] = data[0]
					}
					return updatedData
				})
			} else {
				const { data, error } = await supabase
					.from('series')
					.insert({
						seriestitle,
						seriesdescription,
						seriesage,
						seriesganre,
						serieslang,
						seriesphoto,
						seriesstate,
						seriesyear,
						premium,
					})
					.single()

				if (error) throw error
				if (data) {
					setSeriesData(prevData => [...prevData, data])
				}
			}

			setEditIndex(null)
			setSeriesForm({
				seriestitle: '',
				seriesdescription: '',
				seriesphoto: '',
				seriesyear: 0,
				seriesstate: '',
				seriesganre: '',
				serieslang: '',
				seriesage: 0,
				premium: false,
			})
			handleCloseModal()
			fetchSeries()
		} catch (err) {
			console.error(err)
		}
	}

	const handleDelete = async (id, index) => {
		try {
			await supabase.from('series_parts').delete().eq('series_id', id)
			const { error } = await supabase.from('series').delete().eq('id', id)
			if (error) {
				console.error('Error deleting record:', error.message)
				return
			}
			const newData = [...seriesData]
			newData.splice(index, 1)
			setSeriesData(newData)
			fetchSeries()
		} catch (error) {
			console.error('Error deleting record:', error.message)
		}
	}

	const handleCloseModal = () => {
		const modal = document.getElementById(`my_modal_${tab}`)
		if (modal) modal.close()
	}

	return (
		<>
			<dialog id={`my_modal_${tab}`} className='modal font-Poppins'>
				<div className='modal-box form_admin'>
					<h3 className='font-bold text-[25px] my-[20px] text-center text-white'>
						SeriesForm
					</h3>
					<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
						<input
							type='text'
							name='seriestitle'
							placeholder='Serial nomi'
							className='input bg-[#17171A] text-white'
							value={seriesForm.seriestitle}
							onChange={handleChange}
							required
						/>
						<input
							type='text'
							name='seriesdescription'
							placeholder='Malumot'
							className='input bg-[#17171A] text-white'
							value={seriesForm.seriesdescription}
							onChange={handleChange}
							required
						/>
						<input
							type='number'
							name='seriesage'
							placeholder='Yosh'
							className='input bg-[#17171A] text-white'
							value={seriesForm.seriesage}
							onChange={handleChange}
							required
						/>
						<input
							type='text'
							name='seriesganre'
							placeholder='Janr'
							className='input bg-[#17171A] text-white'
							value={seriesForm.seriesganre}
							onChange={handleChange}
							required
						/>
						<input
							type='text'
							name='serieslang'
							placeholder='Til'
							className='input bg-[#17171A] text-white'
							value={seriesForm.serieslang}
							onChange={handleChange}
							required
						/>
						<input
							type='text'
							name='seriesphoto'
							placeholder='Rasm'
							className='input bg-[#17171A] text-white'
							value={seriesForm.seriesphoto}
							onChange={handleChange}
							required
						/>
						<input
							type='number'
							name='seriesyear'
							placeholder='Yil'
							className='input bg-[#17171A] text-white'
							value={seriesForm.seriesyear}
							onChange={handleChange}
							required
						/>
						<input
							type='text'
							name='seriesstate'
							placeholder='Mamlakat'
							className='input bg-[#17171A] text-white'
							value={seriesForm.seriesstate}
							onChange={handleChange}
							required
						/>
						<div className='flex items-center gap-2'>
							<label htmlFor='premium' className='text-white'>
								Premium
							</label>
							<select
								name='premium'
								value={seriesForm.premium ? 'Ha' : "Yo'q"}
								onChange={e =>
									setSeriesForm(prevState => ({
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
			<div className='overflow-x-auto'>
				<table className='min-w-full mt-[20px]'>
					<thead>
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Serial nomi
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Malumot
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Yosh
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Janr
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Til
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Rasm
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Yil
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Mamlakat
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Premium
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
								Harakat
							</th>
						</tr>
					</thead>
					<tbody>
						{seriesData.map((series, index) => (
							<tr key={series.id} className='text-white'>
								<td className='px-6 py-4 text-sm'>
									{series.seriestitle}
								</td>
								<td className='px-6 py-4 text-sm'>
									{series.seriesdescription}
								</td>
								<td className='px-6 py-4 text-sm'>
									{series.seriesage}
								</td>
								<td className='px-6 py-4 text-sm'>
									{series.seriesganre}
								</td>
								<td className='px-6 py-4 text-sm'>
									{series.serieslang}
								</td>
								<td className='px-6 py-4 text-sm'>
									<img
										src={series.seriesphoto}
										alt={series.seriestitle}
										className='w-[50px] h-[50px] object-cover'
									/>
								</td>
								<td className='px-6 py-4 text-sm'>
									{series.seriesyear}
								</td>
								<td className='px-6 py-4 text-sm'>
									{series.seriesstate}
								</td>
								<td>{series.premium ? 'Ha' : "Yo'q"}</td>
								<td className='px-6 py-4 text-sm'>
									<div className='flex items-center gap-3'>
										<button
											onClick={() => handleEdit(index, series)}
											className='bg-orange-500 text-white px-3 py-1 rounded-lg'
											key={`edit-${series.id}`}
										>
											Edit
										</button>
										<button
											onClick={() => handleDelete(series.id, index)}
											className='bg-red-500 text-white px-3 py-1 rounded-lg'
											key={`delete-${series.id}`}
										>
											Delete
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default SeriesAdmin
