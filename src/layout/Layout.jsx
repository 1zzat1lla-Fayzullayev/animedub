import React, { useState, useEffect, memo } from 'react'
import Navbar from '../components/Navbar'
import Main from '../components/Main'
import Footer from '../components/Footer'
import { UserProvider } from '../context/UsersContext'

function Layout({ user, onSignOut, imagesLoaded }) {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const delay = setTimeout(() => {
			setLoading(false)
		}, 2000)
		return () => clearTimeout(delay)
	}, [loading])

	return (
		<>
			{loading ? (
				<div className='h-screen w-screen flex justify-center items-center'>
					<span className='loading loading-ring w-[50px] overflow-hidden bg-white'></span>
				</div>
			) : (
				<div>
					<Navbar user={user} onSignOut={onSignOut} />
					<UserProvider user={user}>
						<Main user={user} imagesLoaded={imagesLoaded} />
					</UserProvider>
					<Footer />
				</div>
			)}
		</>
	)
}

export default memo(Layout)
