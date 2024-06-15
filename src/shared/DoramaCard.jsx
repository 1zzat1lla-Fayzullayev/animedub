import React, { memo, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import supabase from '../supabase/data'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Link } from 'react-router-dom'
import { Autoplay } from 'swiper/modules'
import Dorama from '../pages/Dorama'

function DoramaCard({ user }) {
	const [cards, setCards] = useState([])
	const [loading, setLoading] = useState(true)
	const swiperRef = useRef(null)

	useEffect(() => {
		getCards()
	}, [])

	async function getCards() {
		try {
			const { data, error } = await supabase.from('series').select('*')
			if (error) {
				console.error(error)
			}
			if (data) {
				const nonPremiumCards = data.filter(item => !item.premium)
				setCards(nonPremiumCards)
			}
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div id='anime'>
			{loading ? (
				<div>Loading...</div>
			) : cards.length > 0 ? (
				<Swiper
					breakpoints={{
						// when window width is >= 320px
						320: {
							slidesPerView: 1,
							spaceBetween: 20,
						},
						// when window width is >= 480px
						480: {
							slidesPerView: 2,
							spaceBetween: 30,
						},
						// when window width is >= 768px
						768: {
							slidesPerView: 3,
							spaceBetween: 40,
						},
						// when window width is >= 1024px
						1024: {
							slidesPerView: 4,
							spaceBetween: 50,
						},
					}}
					spaceBetween={30}
					slidesPerView={1.4}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					modules={[Autoplay]}
					onBeforeInit={swiper => {
						swiperRef.current = swiper
					}}
					style={{ height: '100%' }}
				>
					{cards.map((item, index) => (
						<SwiperSlide key={index}>
							<Link to={`/series/${item.seriestitle}`}>
								<Dorama card={item} />
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<div>
					<p className='text-red-500 font-Montserrat text-[18px] text-center md:text-start'>
						Mavjud emas!
					</p>
				</div>
			)}
		</div>
	)
}

export default memo(DoramaCard)
