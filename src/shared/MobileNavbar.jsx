import React from 'react'
import PicturesData from '../PicturesData'
import { Link } from 'react-router-dom'

function MobileNavbar({ closeNavbar, user, onSignOut }) {
	return (
		<>
			<div className='h-screen w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] fixed top-0 left-0 bottom-0 right-0 rounded-[10px] z-[100]'>
				<img
					src={PicturesData.close}
					alt='close'
					className='w-[40px] absolute right-2 top-2'
					onClick={closeNavbar}
				/>
				<ul className='flex flex-col h-full justify-center items-center gap-[20px] text-white'>
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
					<li>
						{user ? (
							<button
								onClick={onSignOut}
								className='block w-full text-left bg-red-500 text-white rounded-[5px] py-[4px] px-[10px] mt-2'
							>
								Chiqish
							</button>
						) : (
							<Link to='/signin'>
								<button className='bg-green-500 text-white rounded-[5px] py-[4px] px-[10px]'>
									Tizimga kirish
								</button>
							</Link>
						)}
					</li>
				</ul>
			</div>
		</>
	)
}

export default MobileNavbar
