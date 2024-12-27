import { useContext } from 'react'
import { AuthContext } from 'context/AuthContenxt'

export const useAuth = () => useContext(AuthContext)