import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Card from './Card'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import supabase from '../supabase/data'
import Slider from 'react-slick'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

function SliderPremiumCard() {
	const [cards, setCards] = useState([])
	const [loading, setLoading] = useState(true)

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
					style={{ height: 'auto' }}
					spaceBetween={30}
					centeredSlides={false}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					navigation={true}
					modules={[Autoplay, Navigation]}
					slidesPerView={4}
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
				<div>Premium kartalar mavjud emas</div>
			)}
		</div>
	)
}

export default SliderPremiumCard
