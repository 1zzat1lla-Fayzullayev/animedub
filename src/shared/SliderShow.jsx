import React, { useEffect, useState, useCallback, useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import '../index.css'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'
import PicturesData from '../PicturesData'
import supabase from '../supabase/data'
import { Blurhash } from 'react-blurhash'

const SliderShow = ({ imagesLoaded, setImagesLoaded }) => {
	const [swipers, setSwipers] = useState([])

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

	useEffect(() => {
		if (swipers.length > 0) {
			const preloadImages = swipers.map(item => {
				return new Promise(resolve => {
					const img = new Image()
					img.src = item.picture
					img.onload = () => resolve(true)
				})
			})

			Promise.all(preloadImages).then(() => {
				setImagesLoaded(true)
			})
		}
	}, [swipers, setImagesLoaded])

	const slides = useMemo(() => {
		return swipers.map(item => (
			<SwiperSlide key={item.id}>
				<div className='overlay-gradient absolute inset-0'></div>
				<div className='flex flex-col items-start absolute z-[50] text-white top-[40%] left-[10%]'>
					<h1 className=' text-[35px] text-start md:text-[60px] font-BebasNeue'>
						{item.title}
					</h1>
					<p className='font-Poppins text-[15px] md:text-[20px] max-w-[650px] text-start'>
						{item.description}
					</p>
					<div className='flex items-center gap-2 border rounded-[6px] p-2 font-Poppins mt-[20px] cursor-pointer'>
						<img src={PicturesData.play} alt='play' style={{ width: '30px' }} />
						<a href='#anime'>Ko'rish</a>
					</div>
				</div>
				{imagesLoaded ? (
					<Blurhash
						hash='L5H2EC=PM+yV0g-mq.wG9c010J}I'
						width={'100%'}
						height={'100%'}
						resolutionX={32}
						resolutionY={32}
						punch={1}
					/>
				) : (
					<img
						src={item.picture}
						alt={item.title}
						className='w-full h-full object-cover'
						loading='lazy'
					/>
				)}
			</SwiperSlide>
		))
	}, [swipers, imagesLoaded])

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
