import React from 'react'
import PicturesData from '../PicturesData'

function MobileNavbar({ closeNavbar }) {
	return (
		<>
			<div className='bg-[#ffffff] fixed top-0 left-0 bottom-0 right-0 w-full h-[100vh] rounded-[10px]'>
				<img
					src={PicturesData.close}
					alt='close'
					className='w-[40px] absolute right-2 top-2'
					onClick={closeNavbar}
				/>
				<ul className='flex flex-col h-full justify-center items-center gap-[20px]'>
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
		</>
	)
}

export default MobileNavbar
