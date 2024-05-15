import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../supabase/data'
import toast from 'react-hot-toast'

function SignUp() {
	const [formSignUp, setFormSignUp] = useState({
		username: '',
		password: '',
	})

	const navigate = useNavigate()

	const handleChange = e => {
		setFormSignUp(prevFormData => ({
			...prevFormData,
			[e.target.name]: e.target.value,
		}))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const { username, password } = formSignUp
		if (!username || !password) {
			toast.error('Username or password cannot be empty')
			return
		}
		try {
			const { data, error } = await supabase
				.from('users')
				.insert([{ username, password }])
			if (error) {
				throw error
			} else {
				console.log(data)
				toast.success('User registered successfully')
				navigate('/')
			}
		} catch (err) {
			console.error(err)
			toast.error('Registration failed')
		}
	}

	return (
		<div className='absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
			<div className='flex justify-center h-screen items-center font-Montserrat'>
				<h2
					className='text-white absolute top-4 left-4 cursor-pointer'
					onClick={() => navigate(-1)}
				>
					Back
				</h2>
				<div className='form_admin p-7 flex flex-col gap-2 w-full mx-[20px] md:mx-0 md:w-[400px]'>
					<h1 className='text-center slider_h1 text-[25px] font-bold'>
						Sign UP
					</h1>
					<div className='flex flex-col gap-4 mt-[20px]'>
						<input
							type='text'
							name='username'
							className='py-[8px] w-full px-[10px] rounded-[5px] bg-[#17171A] text-white placeholder-gray-400'
							placeholder='Username'
							value={formSignUp.username}
							onChange={handleChange}
						/>
						<input
							type='password'
							name='password'
							className='py-[8px] w-full px-[10px] rounded-[5px] bg-[#17171A] text-white placeholder-gray-400'
							placeholder='Password'
							value={formSignUp.password}
							onChange={handleChange}
						/>
					</div>
					<Link to='/signin' className='flex justify-between text-white'>
						Already have an account?{' '}
						<span className='text-blue-500 hover:underline'>Sign IN</span>
					</Link>
					<button
						className='bg-green-500 text-white w-full rounded-[5px] py-[6px] px-[10px]'
						onClick={handleSubmit}
					>
						Submit
					</button>
				</div>
			</div>
		</div>
	)
}

export default SignUp
