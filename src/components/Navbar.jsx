// Navbar.js
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../supabase/data'
import MobileNavbar from '../shared/MobileNavbar'
import PicturesData from '../PicturesData'

function Navbar({ user, onSignOut }) {
	const [showMobileNav, setShowMobileNav] = useState(false)
	const [openDropdown, setOpenDropdown] = useState(false)
	const navigate = useNavigate()

	const handleShowNavbarMobile = () => {
		setShowMobileNav(!showMobileNav)
		document.body.classList.toggle('overflow-hidden')
	}

	const handleOpenDropdown = () => {
		setOpenDropdown(!openDropdown)
	}

	const handleSignOut = async () => {
		try {
			const { error } = await supabase.auth.signOut()
			if (error) throw error
			onSignOut()
			navigate('/')
		} catch (error) {
			console.error('Sign out error:', error.message)
		}
	}

	return (
		<div className='flex justify-center'>
			<div className='fixed w-[98%] z-[100] flex justify-between items-center font-Montserrat bg-inherit p-3 rounded-[10px] mt-[10px] px-[10px] navbar_anima'>
				<div className='flex items-center justify-between w-full mx-[20px] md:mx-[40px]'>
					<div className='flex items-center gap-5 text-white'>
						<Link to='/'>
							<h1 className='font-bold cursor-pointer text-[20px]'>
								Anime <span className='slider_h1'>DUB</span>
							</h1>
						</Link>
						<ul className='md:flex justify-center items-center gap-[20px] hidden'>
							<li>
								<a href='#'>Home</a>
							</li>
							<li>
								<a href='#'>Anime</a>
							</li>
							<li>
								<a href='#'>About</a>
							</li>
						</ul>
					</div>
					<div className='flex items-center gap-4'>
						{user ? (
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
									<div className='w-[150px] rounded-[5px] navbar_anima absolute right-0 top-[100%] mt-4 bg-white shadow-lg p-4'>
										<p className='text-white font-bold text-[20px]'>
											{user.username}
										</p>
										<button
											onClick={handleSignOut}
											className='block w-full text-left bg-red-500 text-white rounded-[5px] py-[4px] px-[10px] mt-2'
										>
											Logout
										</button>
									</div>
								)}
							</div>
						) : (
							<Link to='/signin'>
								<button className='bg-green-500 text-white rounded-[5px] py-[4px] px-[10px]'>
									Login
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
					{showMobileNav && (
						<MobileNavbar closeNavbar={handleShowNavbarMobile} />
					)}
				</div>
			</div>
		</div>
	)
}

export default Navbar
