import React, { useState } from 'react'
import Wrapper from '../layout/Wrapper'
import MobileNavbar from '../shared/MobileNavbar'
import { Link } from 'react-router-dom'

function Navbar() {
	const [showMobileNav, setShowMobileNav] = useState(false)

	const handleShowNavbarMobile = () => {
		setShowMobileNav(!showMobileNav)
		document.body.classList.toggle('overflow-hidden')
	}
	return (
		<>
			{/* <Wrapper> */}
			<div className='flex justify-center'>
				<div className='fixed w-[98%] z-[100] flex justify-between items-center font-Montserrat bg-inherit p-2 rounded-[10px] mt-[10px] px-[10px] navbar_anima'>
					<div className='flex items-center justify-between w-full'>
						<div className='flex items-center gap-5 text-white'>
							<Link to='/'>
								<h1 className='font-bold cursor-pointer text-[20px]'>
									Anime{' '}
									<span className='slider_h1'>DUB</span>
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
						<input
							type='search'
							placeholder='Search...'
							className='input hidden md:block bg-inherit'
						/>
						{/* Hamburger Start */}
						<div
							className='flex flex-col items-start gap-[6px] md:hidden'
							onClick={handleShowNavbarMobile}
						>
							<div className='w-[25px] h-[2px] bg-white'></div>
							<div className='w-[25px] h-[2px] bg-white'></div>
							<div className='w-[20px] h-[2px] bg-white'></div>
						</div>
						{/* Hamburger End */}
						{showMobileNav && (
							<MobileNavbar closeNavbar={handleShowNavbarMobile} />
						)}
					</div>
				</div>
			</div>
			{/* </Wrapper> */}
		</>
	)
}

export default Navbar
