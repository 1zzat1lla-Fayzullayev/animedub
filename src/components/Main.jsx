import React from 'react'
import SliderShow from '../shared/SliderShow'
import Wrapper from '../layout/Wrapper'
import SliderCard from '../shared/SliderCard'
import PicturesData from '../PicturesData'

function Main({user}) {
	return (
		<div>
			<SliderShow />
			<Wrapper>
				<div className='flex gap-2 justify-center md:justify-start items-center'>
					<h2 className='linear_text text-[30px] font-bold font-Montserrat my-[20px]'>
						Popular
					</h2>
					<img src={PicturesData.star} alt='star' className='w-[30px]' />
				</div>
				<SliderCard user={user}/>
			</Wrapper>
		</div>
	)
}

export default Main
