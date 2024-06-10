import React, { memo, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import supabase from '../supabase/data'
import MobileNavbar from '../shared/MobileNavbar'
import PicturesData from '../PicturesData'

function Navbar({ user, onSignOut }) {
	const [showMobileNav, setShowMobileNav] = useState(false)
	const [openDropdown, setOpenDropdown] = useState(false)
	const [searchQuery, setSearchQuery] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const [cards, setCards] = useState([])
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

	useEffect(() => {
		getAllCards()
	}, [])

	async function getAllCards() {
		setIsLoading(true)
		try {
			const { data, error } = await supabase.from('card').select('*')
			if (error) {
				console.error(error)
			}
			if (data) {
				setCards(data)
			}
		} catch (err) {
			console.log(err)
		} finally {
			setIsLoading(false)
		}
	}

	const filteredCards = cards.filter(card =>
		card.cardname.toLowerCase().includes(searchQuery.toLowerCase())
	)

	const handleSearchInputChange = e => {
		setSearchQuery(e.target.value)
	}

	const userHasPremium = user && user.hiddenpremium

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
						<img
							src={PicturesData.logo}
							alt=''
							className='w-[50px] rounded-full'
						/>
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
						<li>
							<Link to='/payment'>Tolov</Link>
						</li>
					</ul>
				</div>

				<div className='flex items-center gap-4'>
					<div className='flex items-center md:gap-1 w-[120px] md:w-[200px]'>
						<input
							type='text'
							name='search'
							placeholder='Qidirish'
							value={searchQuery}
							onChange={handleSearchInputChange}
							className='bg-inherit outline-none text-white py-2 w-full transition-colors duration-300 input-wrapper'
						/>
						<img
							src={PicturesData.search}
							alt='search'
							className='w-[20px] md:w-[25px] cursor-pointer'
						/>
					</div>

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
									className='w-[150px] rounded-[5px] absolute right-0 top-[100%] mt-6 bg-white shadow-lg p-4'
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
							<button className='bg-green-500 text-white rounded-[5px] py-[4px] px-[10px] hidden md:block'>
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
				{showMobileNav && (
					<MobileNavbar
						closeNavbar={handleShowNavbarMobile}
						user={user}
						onSignOut={onSignOut}
					/>
				)}
			</div>

			{/* Render filtered cards */}
			{searchQuery && (
				<div
					className='absolute max-w-[200px] w-full max-h-[200px] rounded-[10px] flex flex-col overflow-y-auto overflow-x-hidden left-[70%] md:left-[82%]'
					style={{
						background:
							'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
						backdropFilter: 'blur(10px)',
						border: '1px solid rgba(255, 255, 255, 0.18)',
						top: 'calc(100% + 10px)',
						transform: 'translateX(-50%)',
					}}
				>
					{filteredCards.length > 0 ? (
						filteredCards.map((card, index) => (
							<div key={index}>
								{card.premium ? (
									userHasPremium ? (
										<Link
											to={`/card/${card.cardname}`}
											className='block text-white font-Poppins w-full py-2 px-4 hover:bg-gray-700'
											key={index}
											onClick={() => setSearchQuery('')}
										>
											<div className='flex justify-between items-center border-b border-[#ffffff71] w-full'>
												<span>{card.cardname}</span>
												<img
													src={card.cardpicture}
													alt={card.cardname}
													className='w-[30px] h-[30px] object-cover rounded-full'
												/>
											</div>
										</Link>
									) : (
										<div
											className='block text-white font-Poppins w-full py-2 px-4 hover:bg-gray-700'
											key={index}
											onClick={() => setSearchQuery('')}
										>
											<div className='flex justify-between items-center border-b border-[#ffffff71] w-full'>
												<span>{card.cardname}</span>
												<span className='text-green-500 text-[10px]'>
													Premium
												</span>
											</div>
										</div>
									)
								) : (
									<Link
										to={`/card/${card.cardname}`}
										className='block text-white font-Poppins w-full py-2 px-4 hover:bg-gray-700'
										key={index}
										onClick={() => setSearchQuery('')}
									>
										<div className='flex justify-between items-center border-b border-[#ffffff71] w-full'>
											<span>{card.cardname}</span>
											<img
												src={card.cardpicture}
												alt={card.cardname}
												className='w-[30px] h-[30px] object-cover rounded-full'
											/>
										</div>
									</Link>
								)}
							</div>
						))
					) : (
						<p className='text-center text-white font-Poppins'>
							Hech qanday karta topilmadi
						</p>
					)}
				</div>
			)}
		</div>
	)
}

export default memo(Navbar)
