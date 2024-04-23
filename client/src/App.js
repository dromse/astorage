import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import { AuthContext } from './context/AuthContext'
import AppRouter from './components/AppRouter'

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [user, setUser] = useState({})

  useEffect(() => {
    try {
      if (JSON.parse(localStorage.getItem('auth'))) {
        setIsAuth(JSON.parse(localStorage.getItem('auth')))
        setUser(JSON.parse(localStorage.getItem('user')))
      }
    } catch (err) {
      localStorage.setItem('auth', isAuth)
      localStorage.setItem('user', JSON.stringify(user))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('auth', isAuth)
    localStorage.setItem('user', JSON.stringify(user))
  }, [isAuth, user])

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        user,
        setUser,
        isLoading,
        setLoading,
      }}
    >
      <BrowserRouter>
        <NavBar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App
