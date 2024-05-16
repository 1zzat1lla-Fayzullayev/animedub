import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './admin/Admin'
import Layout from './layout/Layout'
import SingleCard from './components/SingleCard'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import { Toaster } from 'react-hot-toast'

function App() {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('user') || 'null')
	)

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(user))
	}, [user])

	const handleSignIn = userData => {
		setUser(userData)
	}

	const handleSignOut = () => {
		setUser(null)
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route path='/animeadmin' element={<Admin />} />
				<Route path='/card/:id' element={<SingleCard user={user} />} />
				<Route
					path='/*'
					element={<Layout user={user} onSignOut={handleSignOut} />}
				/>
				<Route path='/signin' element={<SignIn onSignIn={handleSignIn} />} />
				<Route path='/signup' element={<SignUp />} />
			</Routes>
			<Toaster />
		</BrowserRouter>
	)
}

export default App
