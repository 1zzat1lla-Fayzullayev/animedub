import React, { useEffect, useState } from 'react'
import Card from './Card'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import supabase from '../supabase/data'
import Slider from 'react-slick'
import SingleCard from '../components/SingleCard'
import { Link } from 'react-router-dom'

function SliderCard() {
	const [card, setCard] = useState([])
	const [selectedCard, setSelectedCard] = useState(null)

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
				setCard(data)
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

	const handleCardClick = clickedCard => {
		setSelectedCard(clickedCard)
	}

	return (
		<div className='slider-container'>
			{card.length > 0 && (
				<>
					<Slider {...settings} className='mySwiper'>
						{card.map((item, index) => (
							<Link to={`/card/${item.id}`} key={index}>
								<div onClick={() => handleCardClick(item)}>
									<Card card={item} />
								</div>
							</Link>
						))}
					</Slider>
				</>
			)}
		</div>
	)
}

export default SliderCard
