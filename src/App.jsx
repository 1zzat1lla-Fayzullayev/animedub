import React, { useEffect, useState, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { UserProvider } from './context/UsersContext'

const Admin = React.lazy(() => import('./admin/Admin'))
const Layout = React.lazy(() => import('./layout/Layout'))
const SingleCard = React.lazy(() => import('./components/SingleCard'))
const SignIn = React.lazy(() => import('./pages/SignIn'))
const SignUp = React.lazy(() => import('./pages/SignUp'))
const YearCategoryCards = React.lazy(() =>
	import('./components/YearCategoryCards')
)
const AllCards = React.lazy(() => import('./pages/AllCards'))
const AllPremiumCards = React.lazy(() => import('./pages/AllPremiumCards'))

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
			<UserProvider user={user}>
				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route path='/animeadmin' element={<Admin />} />
						<Route
							path='/card/:id'
							element={<SingleCard user={user} onSignOut={handleSignOut} />}
						/>
						<Route
							path='/year-category/:year'
							element={
								<YearCategoryCards user={user} onSignOut={handleSignOut} />
							}
						/>
						<Route
							path='/allcards'
							element={<AllCards user={user} onSignOut={handleSignOut} />}
						/>
						<Route
							path='/allpremium'
							element={
								<AllPremiumCards user={user} onSignOut={handleSignOut} />
							}
						/>
						<Route
							path='/*'
							element={<Layout user={user} onSignOut={handleSignOut} />}
						/>
						<Route
							path='/signin'
							element={<SignIn onSignIn={handleSignIn} />}
						/>
						<Route path='/signup' element={<SignUp />} />
					</Routes>
				</Suspense>
			</UserProvider>
			<Toaster />
		</BrowserRouter>
	)
}

export default App
