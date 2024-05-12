// App.jsx
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './admin/Admin'
import Layout from './layout/Layout'
import SingleCard from './components/SingleCard'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/animeadmin' element={<Admin />} />
				<Route path='/card/:id' element={<SingleCard />} />
				<Route path='/*' element={<Layout />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
