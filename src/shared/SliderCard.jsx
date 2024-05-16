import React, { useEffect, useState } from 'react'
import Card from './Card'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import supabase from '../supabase/data'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

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

	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	}

	return (
		<div className='slider-container'>
			{loading ? (
				<div>Loading...</div>
			) : cards.length > 0 ? (
				<Slider {...settings} className='mySwiper'>
					{cards.map((item, index) => (
						<div key={index}>
							<Link to={`/card/${item.id}`}>
								<Card card={item} user={user} />
							</Link>
						</div>
					))}
				</Slider>
			) : (
				<div>No cards available</div>
			)}
		</div>
	)
}

export default SliderCard
