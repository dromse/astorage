import React, { useContext, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

import AuthService from '../service/AuthService'
import { AuthContext } from '../context/AuthContext'
import { Redirect } from 'react-router-dom'

function Login() {
  const { isAuth, setIsAuth, user, setUser, setLoading } =
    useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = async (email, password) => {
    setLoading(true)

    AuthService.login(email, password)
      .then((response) => {
        setIsAuth(true)
        setUser(response.data.userData.user)

        localStorage.setItem('accessToken', response.data.userData.accessToken)
        localStorage.setItem('auth', isAuth)
        localStorage.setItem('user', JSON.stringify(user))
      })
      .catch((err) => console.log(err))

    setLoading(false)
  }

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Авторизція</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className='mb-3' controlId='formGroupEmail'>
            <Form.Label>Електронна скринька</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type='email'
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
              placeholder='Введіть ваш пароль'
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => login(email, password)}>
          Авторизуватися
          {isAuth ? <Redirect to='/myprofile' /> : <></>}
        </Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default Login
