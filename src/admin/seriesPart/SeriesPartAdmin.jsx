import React, { useEffect, useState } from 'react'
import supabase from '../../supabase/data'
import PicturesData from '../../PicturesData'

function SeriesPartAdmin({ tab }) {
	const [seriesPartData, setSeriesPartData] = useState([])
	const [seriesData, setSeriesData] = useState([])
	const [seriesPartForm, setSeriesPartForm] = useState({
		selectedSeries: '',
		seriestitle: '',
		content: '',
	})

	const [editIndex, setEditIndex] = useState(null)

	useEffect(() => {
		fetchSeries()
	}, [])

	const fetchSeries = async () => {
		try {
			const { data, error } = await supabase
				.from('series')
				.select('*, series_parts(*)')
			if (error) {
				throw error
			} else {
				setSeriesData(data)
				const allSeriesParts = data.flatMap(series => series.series_parts)
				setSeriesPartData(allSeriesParts)
			}
		} catch (error) {
			console.error('Error fetching series data:', error.message)
		}
	}

	const handleChange = e => {
		const { name, value } = e.target
		setSeriesPartForm(prevState => ({ ...prevState, [name]: value }))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const { seriestitle, content, selectedSeries } = seriesPartForm
		if (!seriestitle || !content || !selectedSeries) {
			console.error('Please provide all details for the form.')
			return
		}

		try {
			if (editIndex !== null) {
				const seriesToUpdate = seriesData.find(
					series => series.id === selectedSeries
				)
				if (!seriesToUpdate) {
					console.error('Invalid series selected for update.')
					return
				}
				const updatedSeriesParts = seriesToUpdate.series_parts.map(
					(part, index) => {
						if (index === editIndex) {
							return {
								...part,
								seriestitle,
								content,
							}
						}
						return part
					}
				)
				const { error } = await supabase
					.from('series_parts')
					.update({ seriestitle, content, series_id: selectedSeries })
					.eq('id', seriesPartData[editIndex].id)
				if (error) throw error
				setSeriesData(prevData =>
					prevData.map(series => {
						if (series.id === selectedSeries) {
							return {
								...series,
								series_parts: updatedSeriesParts,
							}
						}
						return series
					})
				)
			} else {
				const { data, error } = await supabase
					.from('series_parts')
					.insert({ seriestitle, content, series_id: selectedSeries })
					.single()
				if (error) throw error
				console.log('Insert operation completed successfully.')
				fetchSeries()
			}
			setEditIndex(null)
			setSeriesPartForm({ seriestitle: '', content: '', selectedSeries: '' })
			handleCloseModal(tab)
		} catch (error) {
			console.error('Error submitting form:', error.message)
		}
	}

	const handleEdit = (index, data) => {
		if (!data) return
		setEditIndex(index)
		setSeriesPartForm({
			seriestitle: data.seriestitle,
			content: data.content,
			selectedSeries: data.series_id,
		})
		const modal = document.getElementById(`my_modal_${tab}`)
		if (modal) modal.showModal()
	}

	const handleDelete = async (id, index) => {
		try {
			const { error } = await supabase
				.from('series_parts')
				.delete()
				.eq('id', id)
			if (error) throw error
			const newData = [...seriesPartData]
			newData.splice(index, 1)
			setSeriesPartData(newData)
			fetchSeries()
		} catch (error) {
			console.error('Error deleting record:', error.message)
		}
	}

	const handleCloseModal = tab => {
		const modal = document.getElementById(`my_modal_${tab}`)
		if (modal) modal.close()
	}

	const handleAddPart = seriesId => {
		setSeriesPartForm({
			selectedSeries: seriesId,
			seriestitle: '',
			content: '',
		})
		setEditIndex(null)
		const modal = document.getElementById(`my_modal_${tab}`)
		if (modal) modal.showModal()
	}

	return (
		<>
			<dialog id={`my_modal_${tab}`} className='modal font-Poppins'>
				<div className='modal-box form_admin'>
					<h3 className='font-bold text-[25px] my-[20px] text-center text-white'>
						SeriesPart
					</h3>
					<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
						<input
							type='text'
							name='seriestitle'
							placeholder='Serial nomi'
							className='input bg-[#17171A] text-white'
							value={seriesPartForm.seriestitle}
							onChange={handleChange}
							required
						/>
						<input
							type='text'
							name='content'
							placeholder='Kontent'
							className='input bg-[#17171A] text-white'
							value={seriesPartForm.content}
							onChange={handleChange}
							required
						/>
						<select
							name='selectedSeries'
							value={seriesPartForm.selectedSeries}
							onChange={handleChange}
							required
							className='input bg-[#17171A] text-white'
						>
							<option value=''>Select Series</option>
							{seriesData.map(s => (
								<option key={s.id} value={s.id}>
									{s.seriestitle}
								</option>
							))}
						</select>
						<button className='btn btn-success text-white'>
							{editIndex !== null ? 'Yangilash' : 'Yuborish'}
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
			<div className='container mx-auto'>
				{seriesData.map(series => (
					<div key={series.id} className='mb-8 mt-[10px]'>
						<table className='table-auto w-full text-white rounded-lg '>
							<thead>
								<tr>
									<th className='px-4 py-2 text-left text-xl font-bold'>
										Serial
									</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className='px-4 py-2 text-lg'>{series.seriestitle}</td>
									<td className='px-4 py-2 text-lg'>
										{series.seriesdescription}
									</td>
								</tr>
								<tr>
									<td colSpan={2} className='px-4 py-2'>
										<h3 className='text-lg font-semibold'>Qismlar:</h3>
										{series.series_parts.map((part, index) => (
											<div
												key={part.id}
												className='bg-gray-700 rounded-lg mt-2 p-4'
											>
												<div className='flex justify-between items-center'>
													<div>
														<h4 className='text-md font-medium'>
															{part.seriestitle}
														</h4>
														<p className='text-sm'>{part.content}</p>
													</div>
													<div className='flex items-center gap-3'>
														<button
															onClick={() => handleEdit(index, part)}
															className='bg-orange-500 text-white px-3 py-1 rounded-lg'
														>
															Tahrirlash
														</button>
														<button
															onClick={() => handleDelete(part.id, index)}
															className='bg-red-500 text-white px-3 py-1 rounded-lg'
														>
															O'chirish
														</button>
													</div>
												</div>
											</div>
										))}
										<button
											onClick={() => handleAddPart(series.id)}
											className='bg-green-500 text-white px-3 py-1 rounded-lg mt-4'
										>
											Yangi qism qo'shish
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				))}
			</div>
		</>
	)
}

export default SeriesPartAdmin
