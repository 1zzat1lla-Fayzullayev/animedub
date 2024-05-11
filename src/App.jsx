import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Admin from './admin/Admin'
import Layout from './layout/Layout'

function App() {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Layout />} />
					<Route path='/animeadmin' element={<Admin />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
