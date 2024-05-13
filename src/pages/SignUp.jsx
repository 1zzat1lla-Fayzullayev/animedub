import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../supabase/data'
import toast from 'react-hot-toast'

function SignUp() {
	const [formSignUp, setFormSignUp] = useState({
		fullName: '',
		email: '',
		password: '',
	})

	const navigate = useNavigate()
	const [passwordVisible, setPasswordVisible] = useState(false)

	const handleChange = e => {
		setFormSignUp(prevFormData => ({
			...prevFormData,
			[e.target.name]: e.target.value,
		}))
	}

	const handleBack = () => {
		navigate('/')
	}

	const handleSubmit = async e => {
		e.preventDefault()
		try {
			if (!formSignUp.email || !formSignUp.fullName || !formSignUp.password) {
				toast.error('Please fill in all the fields')
				return
			}
			const { error } = await supabase.auth.signUp({
				email: formSignUp.email,
				password: formSignUp.password,
				options: {
					data: {
						fullName: formSignUp.fullName,
					},
				},
			})
			if (error) {
				throw error
			}
			toast.success('Sign up successful')
			navigate('/')
		} catch (err) {
			console.error('Sign up error:', err.message)
			toast.error('Sign up failed. Please try again.')
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
							Sign UP
						</h1>
						<div className='flex flex-col gap-4 mt-[20px]'>
							<input
								type='text'
								name='fullName'
								className='py-[8px] w-full px-[10px] rounded-[5px] bg-[#17171A] text-white placeholder-gray-400'
								placeholder='Full Name'
								value={formSignUp.fullName}
								onChange={handleChange}
							/>
							<input
								type='email'
								name='email'
								className='py-[8px] w-full px-[10px] rounded-[5px] bg-[#17171A] text-white placeholder-gray-400'
								placeholder='Email'
								value={formSignUp.email}
								onChange={handleChange}
							/>
							<div className='relative'>
								<input
									type={passwordVisible ? 'text' : 'password'}
									name='password'
									className='py-[8px] w-full px-[10px] rounded-[5px] bg-[#17171A] text-white placeholder-gray-400'
									placeholder='Password'
									value={formSignUp.password}
									onChange={handleChange}
								/>
								<button
									className='absolute inset-y-0 right-0 mr-2 mt-1 text-white focus:outline-none'
									onClick={() => setPasswordVisible(prev => !prev)}
								>
									{passwordVisible ? 'Hide' : 'Show'}
								</button>
							</div>
						</div>
						<Link
							to='/signin'
							className='flex flex-col md:flex-row justify-between text-white'
						>
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
		</>
	)
}

export default SignUp
