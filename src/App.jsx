import React, { useEffect, useState, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { UserProvider } from './context/UsersContext'
import Payment from './shared/Payment'
import Dorama from './pages/Dorama'
import SingleDoramaCard from './components/SingleDoramaCard'
import SeriesParts from './components/SeriesParts'
import AllDorama from './pages/AllDorama'
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

	// const [stop, setStop] = useState(true)

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(user))
	}, [user])

	const handleSignIn = userData => {
		setUser(userData)
	}

	const handleSignOut = () => {
		setUser(null)
	}

	// if (stop) {
	// 	return <h2 className='h-screen text-green-500 font-Montserrat text-[25px] flex justify-center items-center'>Sayt vaqtinchaga to'xtatildi!</h2>
	// }

	return (
		<BrowserRouter>
			<UserProvider user={user}>
				<Suspense fallback={<div>Loading...</div>}>
					<Routes>
						<Route path='/animeadmin' element={<Admin />} />
						<Route
							path='/card/:cardname'
							element={<SingleCard user={user} onSignOut={handleSignOut} />}
						/>
						<Route
							path='/series/:seriestitle'
							element={
								<SingleDoramaCard user={user} onSignOut={handleSignOut} />
							}
						/>
						<Route path='/parts/:partId' element={<SeriesParts />} />
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
							path='/allseries'
							element={<AllDorama user={user} onSignOut={handleSignOut} />}
						/>
						<Route path='/dorama' element={<Dorama />} />
						<Route path='/payment' element={<Payment />} />
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
