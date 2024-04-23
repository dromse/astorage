import React, { useContext, useState } from 'react'
import AuthService from '../service/AuthService'
import { AuthContext } from '../context/AuthContext'
import { Button, Form, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const { isAuth, setIsAuth, user, setUser } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const signup = async (username, email, password) => {
    AuthService.signup(email, password, username)
      .then((response) => {
        setIsAuth(true)
        setUser(response.data.userData.user)

        localStorage.setItem('accessToken', response.data.userData.accessToken)
        localStorage.setItem('auth', isAuth)
        localStorage.setItem('user', user)
      })
      .catch((err) => console.log(err))
  }

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Зареєструватися</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className='mb-3'>
            <Form.Label>Найменування</Form.Label>
            <Form.Control
              onChange={(e) => setUsername(e.target.value)}
              type='text'
              value={username}
              placeholder='Введіть найменування користувача'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formGroupEmail'>
            <Form.Label>Електронна скринька</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type='text'
              value={email}
              placeholder='Введіть електронну скриньку'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formGroupPassword'>
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type='password'
              placeholder='Введіть пароль'
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          as={Link}
          to='/myprofile'
          onClick={() => signup(username, email, password)}
        >
          Зареєструватися
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default SignUp
