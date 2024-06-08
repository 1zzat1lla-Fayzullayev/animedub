import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Payment() {
	const navigate = useNavigate()
	const [copy, setCopy] = useState(false)

	const handleCopy = () => {
		const textToCopy = '9860 0601 3225 8009'
		navigator.clipboard
			.writeText(textToCopy)
			.then(() => {
				setCopy(true)
				setTimeout(() => setCopy(false), 2000)
			})
			.catch(err => {
				console.error('Failed to copy text: ', err)
			})
	}

	return (
		<>
			<div className='relative h-screen w-screen bg-slate-950'>
				<div className='absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3e3e3e,transparent)]'>
					<h2
						className='text-white absolute top-4 left-4 cursor-pointer font-Poppins'
						onClick={() => navigate('/')}
					>
						Asosiy
					</h2>
					<div className='flex justify-center items-center h-screen'>
						<div className='relative text-white border font-Poppins border-white p-[10px] rounded-[10px] max-w-[300px] w-full min-h-[70px] flex justify-center items-center'>
							<div onClick={handleCopy}>
								<p className='font-Poppins text-[22px] cursor-pointer'>
									9860 0601 3225 8009
								</p>
								<p className='absolute bottom-1 right-2 text-[12px] cursor-pointer'>
									{copy ? 'Copied!' : 'Copy'}
								</p>
							</div>
						</div>
					</div>
					<div className='absolute bottom-4 md:left-4 mx-[10px] md:mx-0 font-Poppins border border-red-500 rounded-[10px] p-[20px]'>
						<h2 className='text-yellow-500 text-[20px]'>Yodda tuting!</h2>
						<p className='text-red-500'>1. Screenshotsiz tolov 0 ga teng!</p>
						<p className='text-green-500'>
							2. Tolov qilingandan so'ng chek va loginingizni botga yuboring
						</p>
						<div className='flex items-center gap-2'>
							<p className='text-green-500'>Bot linki: </p>{' '}
							<a
								href='https://t.me/AnimadubAdminBot'
								target='_blank'
								className='text-blue-500 underline'
							>
								AnimadubAdminBot
							</a>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default Payment
