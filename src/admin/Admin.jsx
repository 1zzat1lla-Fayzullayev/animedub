import React, { useState } from 'react'
import supabase from '../supabase/data'

function Admin() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [title, setTitle] = useState('')
	const [descreption, setDescreption] = useState('')
	const [picture, setPicture] = useState('')
	const [error, setError] = useState(null)

	const handleSubmit = async e => {
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
				setError(null)
			}
		} catch (error) {
			console.error('Error submitting form:', error.message)
			setError('Failed to submit form. Please try again.')
		}
		setTitle('')
		setDescreption('')
		setPicture('')
	}

	return (
		<div>
			{isLoggedIn ? (
				<div>
					<form onSubmit={handleSubmit}>
						<input
							type='text'
							placeholder='Title'
							value={title}
							onChange={e => setTitle(e.target.value)}
						/>
						<input
							type='text'
							placeholder='Description'
							value={descreption}
							onChange={e => setDescreption(e.target.value)}
						/>
						<input
							type='text'
							placeholder='Picture URL'
							value={picture}
							onChange={e => setPicture(e.target.value)}
						/>
						<button type='submit'>Submit</button>
					</form>
					{error && <p className='text-red-500'>{error}</p>}
				</div>
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
