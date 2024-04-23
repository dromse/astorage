import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import Visibility from '../enums/visibilityEnum.js'
import UserService from '../service/UserService.js'

const Settings = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [photo, setPhoto] = useState(null)
  const [visibility, setVisibility] = useState('')

  function update() {
    if (username) {
      UserService.changeUsername(username)
    }

    if (email) {
      UserService.changeEmail(email)
    }

    if (photo) {
      UserService.changeProfilePhoto(photo)
    }

    if (password) {
      UserService.changePassword(password)
    }

    if (visibility) {
      UserService.changeVisibility(visibility)
    }
  }

  return (
    <Modal.Dialog>
      <Modal.Header>
        <Modal.Title>Налаштування</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form.Group className='mb-3' controlId='formGroupEmail'>
          <Form.Label>Змінити ім'я</Form.Label>
          <Form.Control
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            value={username}
            placeholder="Введіть своє ім'я"
          />
        </Form.Group>

        <Form>
          <Form.Group className='mb-3' controlId='formGroupEmail'>
            <Form.Label>Змінити електрону скриньку</Form.Label>
            <Form.Control
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              value={email}
              placeholder='Введіть нову електронну скриньку'
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formGroupPassword'>
            <Form.Label>Змінити пароль</Form.Label>
            <Form.Control
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type='password'
              placeholder='Введіть новий пароль'
            />
          </Form.Group>

          {/* <Form.Group className='mb-3' controlId=''> */}
          {/*   <Form.Label>Change user profile visibility</Form.Label> */}
          {/**/}
          {/*   <Form.Select onChange={(e) => setVisibility(e.target.value)}> */}
          {/*     {Object.getOwnPropertyNames(Visibility).map((vis) => ( */}
          {/*       <option key={vis} value={vis}> */}
          {/*         {vis} */}
          {/*       </option> */}
          {/*     ))} */}
          {/*   </Form.Select> */}
          {/* </Form.Group> */}

          <Form.Group className='mb-3' controlId='formGroupPassword'>
            <Form.Label>Змінити фото користувача</Form.Label>

            <Form.Control
              type='file'
              accept='.jpg'
              onChange={(e) => setPhoto(e.target.files[0])}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={() => update()}>Змінити</Button>
      </Modal.Footer>
    </Modal.Dialog>
  )
}

export default Settings
