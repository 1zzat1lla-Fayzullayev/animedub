// Navbar.js
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../supabase/data'
import MobileNavbar from '../shared/MobileNavbar'
import PicturesData from '../PicturesData'

function Navbar({ user, onSignOut }) {
	const [showMobileNav, setShowMobileNav] = useState(false)
	const [openDropdown, setOpenDropdown] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const navigate = useNavigate()

	const handleShowNavbarMobile = () => {
		setShowMobileNav(!showMobileNav)
		document.body.classList.toggle('overflow-hidden')
	}

	const handleOpenDropdown = () => {
		setOpenDropdown(!openDropdown)
	}

	const handleSignOut = async () => {
		setIsLoading(true)
		try {
			const { error } = await supabase.auth.signOut()
			if (error) throw error
			onSignOut()
			navigate('/')
		} catch (error) {
			console.error('Sign out error:', error.message)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div
			className='fixed w-full z-[100] bg-inherit p-3 rounded-[10px] mt-[5px] px-[10px]'
			style={{
				background:
					'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
				backdropFilter: 'blur(10px)',
				border: '1px solid rgba(255, 255, 255, 0.18)',
			}}
		>
			<div className='flex justify-between items-center font-Poppins'>
				<div className='flex items-center gap-5 text-white'>
					<Link to='/'>
						<h1 className='font-bold cursor-pointer text-[20px]'>
							Anima <span className='slider_h1'>DUB</span>
						</h1>
					</Link>
					<ul className='md:flex justify-center items-center gap-[20px] hidden'>
						<li>
							<Link to='/'>Asosiy</Link>
						</li>
						<li>
							<Link to='/allcards'>Anime barchasi</Link>
						</li>
						<li>
							<Link to='/allpremium'>Premium barchasi</Link>
						</li>
						<li>
							<a href='#'>Aloqaga chiqish</a>
						</li>
					</ul>
				</div>
				<div className='flex items-center gap-4'>
					{isLoading ? (
						<div>Loading...</div>
					) : user ? (
						<div className='relative'>
							<div
								className='bg-white w-[40px] h-[40px] rounded-full flex justify-center items-center cursor-pointer'
								onClick={handleOpenDropdown}
							>
								<img
									src={PicturesData.user}
									alt='user'
									className='w-[30px] object-cover'
								/>
							</div>
							{openDropdown && (
								<div
									className='w-[150px] rounded-[5px] absolute right-0 top-[100%] mt-4 bg-white shadow-lg p-4'
									style={{
										background:
											'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
										backdropFilter: 'blur(10px)',
										border: '1px solid rgba(255, 255, 255, 0.18)',
									}}
								>
									<p className='text-white font-semibold text-[20px]'>
										{user.username}
									</p>
									<button
										onClick={handleSignOut}
										className='block w-full text-left bg-red-500 text-white rounded-[5px] py-[4px] px-[10px] mt-2'
									>
										Chiqish
									</button>
								</div>
							)}
						</div>
					) : (
						<Link to='/signin'>
							<button className='bg-green-500 text-white rounded-[5px] py-[4px] px-[10px]'>
								Tizimga kirish
							</button>
						</Link>
					)}
					<div
						className='flex flex-col items-start gap-[6px] md:hidden'
						onClick={handleShowNavbarMobile}
					>
						<div className='w-[25px] h-[2px] bg-white'></div>
						<div className='w-[25px] h-[2px] bg-white'></div>
						<div className='w-[20px] h-[2px] bg-white'></div>
					</div>
				</div>
				{showMobileNav && <MobileNavbar closeNavbar={handleShowNavbarMobile} />}
			</div>
		</div>
	)
}

export default Navbar
