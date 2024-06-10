import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import '../index.css'
import { Autoplay } from 'swiper/modules'
import PicturesData from '../PicturesData'
import supabase from '../supabase/data'
import { useNavigate } from 'react-router-dom'

const SliderShow = () => {
	const [swipers, setSwipers] = useState([])
	const navigate = useNavigate()

	const getSliders = useCallback(async () => {
		try {
			const { data, error } = await supabase.from('sliders').select('*')
			if (error) {
				console.error(error)
			}
			if (data) {
				setSwipers(data)
			}
		} catch (err) {
			console.error(err)
		}
	}, [])

	useEffect(() => {
		getSliders()
	}, [getSliders])

	const slides = useMemo(() => {
		return swipers.map(item => (
			<SwiperSlide key={item.id}>
				<div className='overlay-gradient absolute inset-0'></div>
				<div className='flex flex-col items-start absolute z-[50] text-white top-[40%] left-[10%]'>
					<h1 className='text-[35px] text-start md:text-[60px] font-BebasNeue'>
						{item.cardname}
					</h1>
					<p className='font-Poppins text-[15px] md:text-[20px] max-w-[650px] text-start'>
						{item.description}
					</p>
					<div
						className='flex items-center gap-2 border rounded-[6px] p-2 font-Poppins mt-[20px] cursor-pointer'
						onClick={() => navigate(`/card/${item.cardname}`)}
					>
						<img src={PicturesData.play} alt='play' style={{ width: '30px' }} />
						<span>Ko'rish</span>
					</div>
				</div>
				<img
					src={item.picture}
					alt={item.title}
					className='w-full h-full object-cover'
					loading='lazy'
				/>
			</SwiperSlide>
		))
	}, [swipers, navigate])

	return (
		<div className='relative'>
			{swipers.length > 0 && (
				<Swiper
					spaceBetween={0}
					slidesPerView={1}
					autoplay={{
						delay: 5000,
						disableOnInteraction: false,
					}}
					modules={[Autoplay]}
				>
					{slides}
				</Swiper>
			)}
		</div>
	)
}

export default React.memo(SliderShow)
