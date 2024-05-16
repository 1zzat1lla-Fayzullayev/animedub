// SliderPremiumCard.js
import React, { useEffect, useState } from 'react'
import Card from './Card'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import supabase from '../supabase/data'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

function SliderPremiumCard({ user }) {
	const [cards, setCards] = useState([])

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
			{cards.length > 0 && (
				<Slider {...settings} className='mySwiper'>
					{cards.map(item => (
						<Link to={`/card/${item.id}`} key={item.id}>
							<div>
								<Card card={item} />
							</div>
						</Link>
					))}
				</Slider>
			)}
		</div>
	)
}

export default SliderPremiumCard
