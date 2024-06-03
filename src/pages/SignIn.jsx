import React, { memo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../supabase/data'
import toast from 'react-hot-toast'

function SignIn({ onSignIn }) {
	const [formSignIn, setFormSignIn] = useState({
		username: '',
		password: '',
	})

	const [loading, setLoading] = useState(false)

	const navigate = useNavigate()

	const handleChange = e => {
		setFormSignIn(prevFormData => ({
			...prevFormData,
			[e.target.name]: e.target.value,
		}))
	}

	const handleSubmit = async e => {
		e.preventDefault()
		const { username, password } = formSignIn
		if (!username || !password) {
			toast.error(`Foydalanuvchi nomi yoki parol bo'sh bo'lishi mumkin emas`)
			return
		}
		setLoading(true)
		try {
			const { data, error } = await supabase
				.from('users')
				.select('*')
				.eq('username', formSignIn.username)
				.single()
			if (error) {
				throw error
			} else {
				if (data && data.password === formSignIn.password) {
					onSignIn(data)
					toast.success('Kirish muvaffaqiyatli amalga oshirildi')
					navigate('/')
				} else {
					toast.error(`Foydalanuvchi nomi yoki parol noto'g'ri`)
				}
			}
		} catch (err) {
			console.error(err)
			toast.error('Tizimga kirishda xatolik yuz berdi')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
			<div className='flex justify-center h-screen items-center font-Poppins'>
				<h2
					className='text-white absolute top-4 left-4 cursor-pointer'
					onClick={() => navigate('/')}
				>
					Asosiy
				</h2>
				<div className='form_admin p-7 flex flex-col gap-2 w-full mx-[20px] md:mx-0 md:w-[400px]'>
					<h1 className='text-center slider_h1 text-[25px] font-bold'>
						Tizimga kirish
					</h1>
					<div className='flex flex-col items-center gap-4 mt-[20px]'>
						<input
							type='text'
							name='username'
							className='py-[8px] w-full px-[10px] rounded-[5px] bg-[#17171A] text-white placeholder-gray-400'
							placeholder='Foydalanuvchi nomi'
							value={formSignIn.username}
							onChange={handleChange}
						/>
						<input
							type='password'
							name='password'
							className='py-[8px] w-full px-[10px] rounded-[5px] bg-[#17171A] text-white placeholder-gray-400'
							placeholder='Parol'
							value={formSignIn.password}
							onChange={handleChange}
						/>
					</div>
					<Link to='/signup' className='flex justify-between text-white'>
						Hisobingiz yo'qmi?{' '}
						<span className='text-blue-500 hover:underline'>
							Ro'yxatdan o'tish
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

export default memo(SignIn)
