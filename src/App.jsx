// App.jsx
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './admin/Admin'
import Layout from './layout/Layout'
import SingleCard from './components/SingleCard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { Toaster } from 'react-hot-toast'

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		const userLoggedIn = localStorage.getItem('isLoggedIn')
		setIsLoggedIn(userLoggedIn === 'true')
	}, [])

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/animeadmin' element={<Admin />} />
				<Route path='/card/:id' element={<SingleCard />} />
				<Route path='/*' element={<Layout />} />
				<Route
					path='/signin'
					element={<SignIn setIsLoggedIn={setIsLoggedIn} />}
				/>
				<Route path='/signup' element={<SignUp />} />
			</Routes>
			<Toaster />
		</BrowserRouter>
	)
}

export default App
