// src/contexts/UserContext.js
import React, { createContext, useContext, useEffect, useState } from 'react'
import supabase from '../supabase/data'

// Create a context for user-related data
const UserContext = createContext()

// Provider component for user-related data
export const UserProvider = ({ user, children }) => {
	// State to track premium user status
	const [isPremiumUser, setIsPremiumUser] = useState(false)

	// Fetch user data when user prop changes
	useEffect(() => {
		if (user) {
			fetchUserData()
		}
	}, [user])

	// Function to fetch user data from supabase
	const fetchUserData = async () => {
		try {
			const { data, error } = await supabase.from('users').select('*')
			if (error) {
				console.error(error)
			} else {
				// Find the user data corresponding to the current user
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
		// Provide isPremiumUser value to the context
		<UserContext.Provider value={{ isPremiumUser }}>
			{children}
		</UserContext.Provider>
	)
}

// Custom hook to consume user-related data from context
export const useUser = () => useContext(UserContext)
