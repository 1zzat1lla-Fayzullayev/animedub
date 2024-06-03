import React, { memo, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Card from './Card'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import supabase from '../supabase/data'
import { Autoplay, Navigation } from 'swiper/modules'

function SliderPremiumCard() {
	const [cards, setCards] = useState([])
	const [loading, setLoading] = useState(true)
	const swiperRef = useRef(null)

	useEffect(() => {
		getCards()
	}, [])

	async function getCards() {
		try {
			const { data, error } = await supabase.from('card').select('*')
			if (error) {
				console.error(error)
			}
			if (data) {
				const premiumCards = data.filter(item => item.premium)
				setCards(premiumCards)
			}
		} catch (err) {
			console.error(err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='slider-container' id='premium'>
			{loading ? (
				<div>Loading...</div>
			) : cards.length > 0 ? (
				<Swiper
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
					className='mySwiper'
				>
					{cards.map(item => (
						<SwiperSlide key={item.id}>
							<Card card={item} />
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<div>
					<p className='text-red-500 font-Montserrat text-[18px] text-center md:text-start'>Premium kartalar mavjud emas</p>
				</div>
			)}
		</div>
	)
}

export default memo(SliderPremiumCard)
