// src/contexts/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react'
import supabase from '../supabase/data'

const UserContext = createContext()

export const UserProvider = ({ user, children }) => {
	const [isPremiumUser, setIsPremiumUser] = useState(false)

	useEffect(() => {
		if (user) {
			fetchUserData()
		}
	}, [user])

	const fetchUserData = async () => {
		try {
			const { data, error } = await supabase.from('users').select('*')
			if (error) {
				console.error(error)
			} else {
				const foundUser = data.find(userData => userData.id === user.id)
				if (foundUser) {
					setIsPremiumUser(foundUser.hiddenpremium)
				}
			}
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<UserContext.Provider value={{ isPremiumUser }}>
			{children}
		</UserContext.Provider>
	)
}

export const useUser = () => useContext(UserContext)
