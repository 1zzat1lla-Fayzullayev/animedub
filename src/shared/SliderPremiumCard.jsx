// SliderPremiumCard.js
import React, { useEffect, useState } from 'react'
import Card from './Card'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import supabase from '../supabase/data'
import Slider from 'react-slick'
import { Link } from 'react-router-dom'

function SliderPremiumCard({ user }) {
	const [card, setCard] = useState([])

	useEffect(() => {
		getCard()
	}, [])

	async function getCard() {
		try {
			const { data, error } = await supabase.from('card').select('*')
			if (error) {
				console.error(error)
			}
			if (data != null) {
				const premiumCards = data.filter(item => item.premium)
				setCard(premiumCards)
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
					slidesToScroll: 3,
					infinite: true,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
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
			{card.length > 0 && (
				<Slider {...settings} className='mySwiper'>
					{card.map((item, index) => (
						<Link to={`/card/${item.id}`} key={index}>
							<div>
								<Card card={item} user={user} />
							</div>
						</Link>
					))}
				</Slider>
			)}
		</div>
	)
}

export default SliderPremiumCard
