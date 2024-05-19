import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import Card from './Card'
import supabase from '../supabase/data'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { Link } from 'react-router-dom'
import { Autoplay, Navigation } from 'swiper/modules'

function SliderCard({ user }) {
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
		<div className='slider-container' id='anime'>
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
					{cards.map((item, index) => (
						<SwiperSlide key={index}>
							<Link to={`/card/${item.id}`}>
								<Card card={item} user={user} />
							</Link>
						</SwiperSlide>
					))}
				</Swiper>
			) : (
				<div>No cards available</div>
			)}
		</div>
	)
}

export default SliderCard
