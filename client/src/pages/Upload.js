import React, { useEffect, useState, useRef } from 'react'
import { Container, Row, Button, Col, Form, Modal, Alert } from 'react-bootstrap'

import AudioService from '../service/AudioService'
import Visibility from '../enums/visibilityEnum.js'

const Upload = () => {
  const [audio, setAudio] = useState(null)
  const [title, setTitle] = useState('Unknown title')
  const [visibility, setVisibility] = useState(Visibility.PUBLIC)

  const upload = () => {
    if (audio !== null) {
      AudioService.upload(audio, title, visibility)
    }
  }

  return (
    <Container fluid className='text-center'>
        {/* <Alert variant='success'>Аудіо запис було додано.</Alert> */}
      <Modal.Dialog>
        <Modal.Header className='justify-content-center'>
          <Modal.Title className='display-4'>Додати аудіо запис</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId=''>
              <Form.Label>Найменування</Form.Label>

              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                type='text'
                value={title}
                placeholder='Введіть найменування аудіо запису'
              />
            </Form.Group>

            <Form.Group className='mb-3' controlId=''>
              <Form.Label>Видимість</Form.Label>

              <Form.Select onChange={(e) => setVisibility(e.target.value)}>
                {Object.getOwnPropertyNames(Visibility).map((vis) => (
                  <option key={vis} value={vis}>
                    {vis}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Container className='align-items justify-content-center'>
            <Row>
              <Col className='text-center custom-file'>
                <div>Виберіть аудіо файл</div>
                <Form.Control
                  type='file'
                  accept='.mp3, .wav'
                  className='mt-3'
                  onChange={(e) => setAudio(e.target.files[0])}
                />

                <Button onClick={() => upload()} className='mt-4'>
                  Завантажити до веб додатку
                </Button>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal.Dialog>
    </Container>
  )
}

export default Upload
