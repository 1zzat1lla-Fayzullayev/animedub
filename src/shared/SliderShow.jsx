import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'

// Import css
import '../index.css'

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import PicturesData from '../PicturesData'
import supabase from '../supabase/data'

function SliderShow() {
	const [swipers, setSwipers] = useState([])

	useEffect(() => {
		getSliders()
	}, [])

	async function getSliders() {
		try {
			const { data, error } = await supabase.from('sliders').select('*')
			if (error) {
				console.log(error)
			}
			if (data != null) {
				setSwipers(data)
			}
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div>
			{swipers && (
				<Swiper
					spaceBetween={30}
					centeredSlides={true}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					pagination={{
						clickable: true,
					}}
					navigation={false}
					modules={[Autoplay, Pagination, Navigation]}
					className='mySwiper'
				>
					{swipers.map((item, index) => (
						<SwiperSlide key={index}>
							<div className='flex flex-col items-start absolute z-[50] text-white top-[40%] left-[10%]'>
								<h1 className='slider_h1 text-[60px] font-BebasNeue'>
									{item.title}
								</h1>
								<p className='font-Inter text-[16px] md:text-[20px] max-w-[650px] text-start'>
									{item.description}
								</p>
								<div className='flex items-center gap-2 border rounded-[6px] p-2 font-Inter mt-[20px] cursor-pointer'>
									<img
										src={PicturesData.play}
										alt='play'
										style={{ width: '30px' }}
									/>
									<p>Ko'rish</p>
								</div>
							</div>
							<img src={item.picture} alt='' />
						</SwiperSlide>
					))}
				</Swiper>
			)}
		</div>
	)
}

export default SliderShow
