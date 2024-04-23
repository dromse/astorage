import React, { useContext, useEffect } from 'react'
import 'bootstrap'
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
} from 'react-bootstrap'

import { AuthContext } from '../context/AuthContext'
import AuthService from '../service/AuthService'
import { Link } from 'react-router-dom'

import AudiotrackIcon from '@material-ui/icons/Audiotrack'
import ProfileIcon from '@material-ui/icons/AccountBox'
import SettingsIcon from '@material-ui/icons/Settings'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import UploadIcon from '@material-ui/icons/Publish'
import SignUpIcon from '@material-ui/icons/Create'
import LoginIcon from '@material-ui/icons/Input'

const NavBar = () => {
  const { isAuth, setIsAuth, setUser } = useContext(AuthContext)

  const logout = async () => {
    try {
      await AuthService.logout()

      setIsAuth(false)
      setUser({})

      localStorage.removeItem('accessToken')
      localStorage.removeItem('auth')
      localStorage.removeItem('user')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Navbar bg='light shadow-sm' expand='lg'>
      <Container fluid>
        <Navbar.Brand className='d-flex align-items-center' as={Link} to='/'>
          <AudiotrackIcon />
          <div>Aудіо сховище</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='me-auto my-2 my-lg-0' style={{ maxHeight: '30%' }}>
            {isAuth ? (
              <>
                <Nav.Link as={Link} to='/myprofile'>
                  <ProfileIcon />
                  Обліковий запис
                </Nav.Link>
                <Nav.Link as={Link} to='/upload'>
                  <UploadIcon />
                  Додати аудіо
                </Nav.Link>
                <Nav.Link as={Link} to='/settings'>
                  <SettingsIcon />
                  Налаштування
                </Nav.Link>
                <Nav.Link as={Link} onClick={(e) => logout(e)} to='/'>
                  <LogoutIcon />
                  Вихід із системи
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to='/login'>
                  <LoginIcon />
                  Авторизуватися
                </Nav.Link>
                <Nav.Link as={Link} to='/signup'>
                  <SignUpIcon />
                  Зареєструватися
                </Nav.Link>
              </>
            )}
          </Nav>

          <Form className='d-flex'>
            <FormControl
              type='search'
              placeholder='Пошук по веб додатку'
              className='me-2'
              aria-label='Search'
            />
            <Button variant='outline-success'>Пошук</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavBar
