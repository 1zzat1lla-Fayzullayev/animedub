import React, { useEffect, useState } from 'react'
import supabase from '../supabase/data'

function Card() {
	const [card, setCard] = useState([])

	useEffect(() => {
		getCard()
	}, [])

	async function getCard() {
		try {
			const { data, error } = await supabase.from('card').select('*')
			if (error) {
				console.log(error)
			}
			if (data != null) {
				setCard(data)
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<>
			<div className='flex justify-center items-center gap-5 p-5 font-Inter cursor-pointer'>
				{card.map((item, index) => (
					<div
						className='card w-[200px] h-[250px] rounded-[20px] p-[5px]'
						key={index}
					>
						<div className='card__content rounded-[17px] w-full h-full overflow-hidden'>
							<img
								src={item.cardpicture}
								alt='404'
								className='h-full w-full object-cover rounded-[17px] transition-all ease-in hover:scale-105'
							/>
							<div className='absolute top-[80%] left-5 text-white font-bold text-[25px]'>
								<h1>{item.cardname}</h1>
							</div>
						</div>
					</div>
				))}
			</div>
		</>
	)
}

export default Card
