import React, { memo, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Card from './Card'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import supabase from '../supabase/data'
import { Autoplay, Navigation } from 'swiper/modules'

function SliderPremiumCard() {
	const [items, setItems] = useState([])
	const [loading, setLoading] = useState(true)
	const swiperRef = useRef(null)

	useEffect(() => {
		getPremiumItems()
	}, [])

	async function getPremiumItems() {
		try {
			const { data: cardData, error: cardError } = await supabase
				.from('card')
				.select('*')
			const { data: seriesData, error: seriesError } = await supabase
				.from('series')
				.select('*')
			if (cardError) {
				console.error(cardError)
			}
			if (seriesError) {
				console.error(seriesError)
			}
			if (cardData && seriesData) {
				const premiumCards = cardData.filter(item => item.premium)
				const premiumSeries = seriesData.filter(item => item.premium)
				setItems([...premiumCards, ...premiumSeries])
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
			) : items.length > 0 ? (
				<Swiper
					spaceBetween={30}
					slidesPerView={1.4}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					modules={[Autoplay, Navigation]}
					onBeforeInit={swiper => {
						swiperRef.current = swiper
					}}
					style={{ height: '100%' }}
					breakpoints={{
						320: {
							slidesPerView: 1,
							spaceBetween: 20,
						},
						480: {
							slidesPerView: 2,
							spaceBetween: 30,
						},
						768: {
							slidesPerView: 3,
							spaceBetween: 40,
						},
						1024: {
							slidesPerView: 4,
							spaceBetween: 50,
						},
					}}
					className='mySwiper'
				>
					{items.map(item => (
						<SwiperSlide key={item.id}>
							<Card card={item} />
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<div>
					<p className='text-red-500 font-Montserrat text-[18px] text-center md:text-start'>
						Premium kartalar mavjud emas
					</p>
				</div>
			)}
		</div>
	)
}

export default memo(SliderPremiumCard)
