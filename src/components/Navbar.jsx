import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../supabase/data'
import MobileNavbar from '../shared/MobileNavbar'

function Navbar() {
	const [showMobileNav, setShowMobileNav] = useState(false)
	const [isLogged, setIsLogged] = useState(false)

	useEffect(() => {
		const session = supabase.auth.setSession()
		setIsLogged(session !== null)
	}, [])

	const handleShowNavbarMobile = () => {
		setShowMobileNav(!showMobileNav)
		document.body.classList.toggle('overflow-hidden')
	}

	const handleSignOut = async () => {
		try {
			await supabase.auth.signOut()
			setIsLogged(false)
			console.log('Signed out successfully')
		} catch (error) {
			console.error('Sign out error:', error.message)
		}
	}

	return (
		<>
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
							{isLogged ? (
								<button
									onClick={handleSignOut}
									className='bg-red-500 text-white rounded-[5px] py-[4px] px-[10px]'
								>
									Logout
								</button>
							) : (
								<Link to='/signin'>
									<button className='bg-green-500 text-white rounded-[5px] py-[4px] px-[10px]'>
										Login
									</button>
								</Link>
							)}
							{/* Hamburger Start */}
							<div
								className='flex flex-col items-start gap-[6px] md:hidden'
								onClick={handleShowNavbarMobile}
							>
								<div className='w-[25px] h-[2px] bg-white'></div>
								<div className='w-[25px] h-[2px] bg-white'></div>
								<div className='w-[20px] h-[2px] bg-white'></div>
							</div>
						</div>

						{/* Hamburger End */}
						{showMobileNav && (
							<MobileNavbar closeNavbar={handleShowNavbarMobile} />
						)}
					</div>
				</div>
			</div>
		</>
	)
}

export default Navbar
