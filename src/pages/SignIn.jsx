import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../supabase/data'
import toast from 'react-hot-toast'

function SignIn() {
	const [formSignIn, setFormSignIn] = useState({
		email: '',
		password: '',
	})

	const navigate = useNavigate()

	const handleBack = () => {
		navigate('/')
	}

	const handleChange = e => {
		setFormSignIn(prevFormData => {
			return {
				...prevFormData,
				[e.target.name]: e.target.value,
			}
		})
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			const { data, error } = await supabase.auth.signInWithPassword({
				email: formSignIn.email,
				password: formSignIn.password,
			})

			if (error) {
				throw error
			}
			navigate('/')
		} catch (err) {
			console.log(err)
			toast.error('Email or password is incorrect')
		}
	}
	return (
		<>
			<div className='absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
				<div className='flex justify-center h-screen items-center font-Montserrat'>
					<h2
						className='text-white absolute top-4 left-4 cursor-pointer'
						onClick={handleBack}
					>
						Back
					</h2>
					<div className='form_admin p-7 flex flex-col gap-2 w-full mx-[20px] md:mx-0 md:w-[400px]'>
						<h1 className='text-center slider_h1 text-[25px] font-bold'>
							Sign In
						</h1>
						<div className='flex flex-col items-center gap-4 mt-[20px]'>
							<input
								type='email'
								name='email'
								className='py-[8px] w-full px-[10px] rounded-[5px] bg-[#17171A] text-white placeholder-gray-400'
								placeholder='Email'
								value={formSignIn.email}
								onChange={handleChange}
							/>
							<input
								type='password'
								name='password'
								className='py-[8px] w-full px-[10px] rounded-[5px] bg-[#17171A] text-white placeholder-gray-400'
								placeholder='Password'
								value={formSignIn.password}
								onChange={handleChange}
							/>
						</div>
						<Link to='/signup' className='flex flex-col md:flex-row justify-between text-white'>
							Don't have an account?{' '}
							<span className='text-blue-500 hover:underline'>Sign UP</span>
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
		</>
	)
}

export default SignIn
