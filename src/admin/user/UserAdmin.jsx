import React, { useEffect, useState } from 'react'
import PicturesData from '../../PicturesData'
import supabase from '../../supabase/data'

function UserAdmin({ tab }) {
	const [userData, setUserData] = useState([])
	const [filteredUsers, setFilteredUsers] = useState([]) // New state for filtered users
	const [editIndex, setEditIndex] = useState(null)
	const [userForm, setUserForm] = useState({
		username: '',
		password: '',
		hiddenpremium: false,
	})
	const [searchUser, setSearchUser] = useState('')

	useEffect(() => {
		fetchUserData()
	}, [])

	useEffect(() => {
		const filtered = userData.filter(user =>
			user.username.toLowerCase().includes(searchUser.toLowerCase())
		)
		setFilteredUsers(filtered)
	}, [searchUser, userData])

	const fetchUserData = async () => {
		try {
			const { data, error } = await supabase.from('users').select('*')
			if (error) {
				console.error(error)
			} else {
				setUserData(data)
				setFilteredUsers(data)
			}
		} catch (err) {
			console.error(err)
		}
	}

	const handleChange = e => {
		const { name, value } = e.target
		setUserForm(prevState => ({ ...prevState, [name]: value }))
		setSearchUser(e.target.value)
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const { username, password, hiddenpremium } = userForm

		if (!username || !password) {
			console.error('Please provide all details for the form.')
			return
		}

		try {
			if (editIndex !== null) {
				const { data, error } = await supabase
					.from('users')
					.update({ username, password, hiddenpremium })
					.eq('id', userData[editIndex].id)

				if (error) throw error

				setUserData(prevData => {
					const updatedData = [...prevData]
					if (data && data.length > 0) {
						updatedData[editIndex] = data[0]
					}
					return updatedData
				})
			} else {
				const { data, error } = await supabase
					.from('users')
					.insert({ username, password, hiddenpremium })
					.single()

				if (error) throw error
				if (data) {
					setUserData(prevData => [...prevData, data])
				}
			}

			setEditIndex(null)
			setUserForm({ username: '', password: '', hiddenpremium: false })
			handleCloseModal()
			fetchUserData()
		} catch (err) {
			console.error(err)
		}
	}

	const handleEdit = (index, data) => {
		if (!data) return
		setEditIndex(index)
		setUserForm({
			username: data.username || '',
			password: data.password || '',
			hiddenpremium: data.hiddenpremium || false,
		})
		const modal = document.getElementById(`my_modal_${tab}`)
		if (modal) modal.showModal()
	}

	const handleDelete = async (id, index) => {
		try {
			const { error } = await supabase.from('users').delete().eq('id', id)
			if (error) throw error
			setUserData(userData => userData.filter((_, i) => i !== index))
		} catch (err) {
			console.error(err)
		}
	}

	const handleCloseModal = () => {
		const modal = document.getElementById(`my_modal_${tab}`)
		if (modal) modal.close()
	}

	return (
		<div>
			<dialog id={`my_modal_${tab}`} className='modal font-Poppins'>
				<div className='modal-box form_admin'>
					<h3 className='font-bold text-2xl my-5 text-center text-white'>
						User Form
					</h3>
					<form onSubmit={handleSubmit} className='flex flex-col gap-4'>
						<input
							type='text'
							name='username'
							placeholder='Foydalanuvchi nomi'
							className='input bg-[#17171A] text-white'
							value={userForm.username}
							onChange={handleChange}
						/>
						<input
							type='password'
							name='password'
							placeholder='Parol'
							className='input bg-[#17171A] text-white'
							value={userForm.password}
							onChange={handleChange}
						/>
						<div className='flex items-center gap-2'>
							<label htmlFor='hiddenpremium' className='text-white'>
								Foydalanuvchidan premiumni o'chirish
							</label>
							<select
								name='hiddenpremium'
								value={userForm.hiddenpremium ? 'Ha' : "Yo'q"}
								onChange={e =>
									setUserForm(prevState => ({
										...prevState,
										hiddenpremium: e.target.value === 'Ha',
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
						className='absolute top-2 right-2 w-8 cursor-pointer'
					/>
				</div>
			</dialog>
			<h2 className='text-white font-bold font-Poppins text-2xl my-4'>
				User Section
			</h2>
			<input
				type='text'
				value={searchUser}
				placeholder="Foydalanuvchi nomi bo'yicha qidirish"
				onChange={handleChange}
				className='bg-inherit outline-none text-white py-3 transition-colors duration-300 input-wrapper border rounded-[5px] px-[10px] w-full mb-5'
			/>
			<div className='overflow-y-scroll h-96'>
				<table className='table'>
					<thead>
						<tr className='text-white font-Poppins'>
							<th>Foydalanuvchi nomi</th>
							<th>Parol</th>
							<th>Premium foydalanuvchi</th>
							<th>Harakat</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers.map((item, index) => (
							<tr key={item.id} className='text-white font-Poppins'>
								<td>{item.username}</td>
								<td>{item.password}</td>
								<td>{item.hiddenpremium ? 'Ha' : "Yo'q"}</td>
								<td className='flex justify-center items-center gap-2'>
									<button
										className='bg-orange-500 p-2 rounded-md'
										onClick={() => handleEdit(index, item)}
									>
										Tahrirlash
									</button>
									<button
										className='bg-red-500 p-2 rounded-md'
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

export default UserAdmin
