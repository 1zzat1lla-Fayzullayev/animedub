import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../supabase/data'
import toast from 'react-hot-toast'

function SignUp() {
	const [formSignUp, setFormSignUp] = useState({
		username: '',
		password: '',
	})

	const [loading, setLoading] = useState(false)

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
			toast.error(`Foydalanuvchi nomi yoki parol bo'sh bo'lishi mumkin emas`)
			return
		}
		setLoading(true)
		try {
			const { data, error } = await supabase
				.from('users')
				.insert([{ username, password }])
			if (error) {
				throw error
			} else {
				console.log(data)
				toast.success(`Foydalanuvchi muvaffaqiyatli ro'yxatdan o'tdi`)
				navigate('/signin')
			}
		} catch (err) {
			console.error(err)
			toast.error('Ro‘yxatdan o‘tish amalga oshmadi')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
			<div className='flex justify-center h-screen items-center font-Montserrat'>
				<h2
					className='text-white absolute top-4 left-4 cursor-pointer'
					onClick={() => navigate('/')}
				>
					Uy
				</h2>
				<div className='form_admin p-7 flex flex-col gap-2 w-full mx-[20px] md:mx-0 md:w-[400px]'>
					<h1 className='text-center slider_h1 text-[25px] font-bold'>
						Ro'yxatdan o'tish
					</h1>
					<div className='flex flex-col gap-4 mt-[20px]'>
						<input
							type='text'
							name='username'
							className='py-[8px] w-full px-[10px] rounded-[5px] bg-[#17171A] text-white placeholder-gray-400'
							placeholder='Foydalanuvchi nomi'
							value={formSignUp.username}
							onChange={handleChange}
						/>
						<input
							type='password'
							name='password'
							className='py-[8px] w-full px-[10px] rounded-[5px] bg-[#17171A] text-white placeholder-gray-400'
							placeholder='Parol'
							value={formSignUp.password}
							onChange={handleChange}
						/>
					</div>
					<Link to='/signin' className='flex justify-between text-white'>
						Hisobingiz bormi?{' '}
						<span className='text-blue-500 hover:underline'>
							Tizimga kirish
						</span>
					</Link>
					<button
						className='bg-green-500 text-white w-full rounded-[5px] py-[6px] px-[10px]'
						onClick={handleSubmit}
						disabled={loading}
					>
						{loading ? 'Loading...' : 'Yuborish'}{' '}
					</button>
				</div>
			</div>
		</div>
	)
}

export default SignUp
