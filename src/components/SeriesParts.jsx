import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../supabase/data'
import Wrapper from '../layout/Wrapper'

function SeriesParts() {
	const [seriesPart, setSeriesPart] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [isVideo, setIsVideo] = useState(false)
	const { partId } = useParams()

	useEffect(() => {
		async function fetchSeriesPart() {
			try {
				const { data, error } = await supabase
					.from('series_parts')
					.select('*')
					.eq('id', partId)
					.single()

				if (error) {
					throw error
				} else {
					setSeriesPart(data)
					setIsVideo(data.content && data.content.includes('video')) // Check content type
				}
			} catch (err) {
				setError('An unexpected error occurred')
			} finally {
				setLoading(false)
			}
		}

		if (partId) {
			fetchSeriesPart()
		} else {
			setError('Invalid part ID')
			setLoading(false)
		}
	}, [partId])

	if (loading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>{error}</div>
	}

	if (!seriesPart) {
		return <div>No part found</div>
	}

	return (
		<div className='h-screen w-screen'>
			<Wrapper>
				<div className='text-white font-Montserrat'>
					<p className='text-[20px]'>{seriesPart.seriestitle}</p>
					{isVideo ? (
						<iframe
							src={seriesPart.content}
							allow='fullscreen'
							allowFullScreen
							className='max-w-[1080px] w-full md:min-h-[500px] min-h-[300px] h-full rounded-[10px] shadow-lg object-contain'
						></iframe>
					) : (
						<p className='font-Montserrat text-red-500 text-[20px]'>
							Tegishli qism topilmadi!
						</p>
					)}
				</div>
			</Wrapper>
		</div>
	)
}

export default SeriesParts
