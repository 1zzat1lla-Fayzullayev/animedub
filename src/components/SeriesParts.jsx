import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import supabase from '../supabase/data'

function SeriesParts() {
	const [seriesPart, setSeriesPart] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
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
					if (error.code === 'PGRST116') {
						setError('No matching part found')
					} else {
						setError('An error occurred while fetching the part')
					}
				} else {
					setSeriesPart(data)
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
			<div>
				<p>{seriesPart.seriestitle}</p>
				<p>{seriesPart.content}</p>
			</div>
		</div>
	)
}

export default SeriesParts
