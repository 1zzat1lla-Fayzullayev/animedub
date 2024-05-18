import React from 'react'
import PicturesData from '../PicturesData'
import { Link } from 'react-router-dom'

function MobileNavbar({ closeNavbar }) {
	return (
		<>
			<div className='h-screen w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] fixed top-0 left-0 bottom-0 right-0 rounded-[10px]'>
				<img
					src={PicturesData.close}
					alt='close'
					className='w-[40px] absolute right-2 top-2'
					onClick={closeNavbar}
				/>
				<ul className='flex flex-col h-full justify-center items-center gap-[20px] text-white'>
					<li>
						<Link to='/'>
							<a href='#'>Asosiy</a>
						</Link>
					</li>
					<li>
						<a href='#anime'>Anime barchasi</a>
					</li>
					<li>
						<a href='#premium'>Premium barchasi</a>
					</li>
					<li>
						<a href='#'>Aloqaga chiqish</a>
					</li>
				</ul>
			</div>
		</>
	)
}

export default MobileNavbar
