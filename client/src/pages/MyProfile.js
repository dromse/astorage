import React, { useContext, useEffect, useState } from 'react'
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import AudioService from '../service/AudioService'
import Player from '../components/Player'
import { Button } from 'react-bootstrap'
import useFetchAudios from '../hooks/useFetchAudio'
import DeleteIcon from '@material-ui/icons/Delete'
import UserService from '../service/UserService'
import DownloadIcon from '@material-ui/icons/GetApp'
import EditIcon from '@material-ui/icons/Edit'

const MyProfile = () => {
  const { user } = useContext(AuthContext)
  const [userAudios, setUserAudios] = useState([])
  console.log(user)

  const [fetchAudios, isLoading, error] = useFetchAudios(async () => {
    const response = await AudioService.getAll()
    setUserAudios(response.data.audios)
  })

  useEffect(() => {
    fetchAudios()
  }, [])

  if (isLoading) {
    return (
      <div className='d-flex justify-content-center align-items-center'>
        <Spinner animation='border' />
      </div>
    )
  }

  if (error) {
    return (
      <h1 className='text-center mt-4 display-6 text-danger'>
        Щось пішло не так...
      </h1>
    )
  }

  const deleteAudio = (audio) => {
    setUserAudios(userAudios.filter((a) => a.id !== audio.id))
  }

  console.log(UserService.getProfilePhotoLink(user.id))

  return (
    <Container className='shadow-sm'>
      <Row>
        {/* <Alert variant='success'>Аудіо запис було видалено.</Alert> */}
        <Col className='bg-light text-center rounded'>
          <h6 className='display-6 mt-3'>{user.username}</h6>
          <hr />
          <img
            className='img-fluid rounded-circle shadow-lg w-1'
            style={{ height: '25vh', width: '25vh' }}
            src={`${UserService.getProfilePhotoLink(user.id)}`}
          />
          <h6 className='display-6 mt-3'>Аудіо записи користувача</h6>
          <hr />

          {userAudios.length !== 0 ? (
            userAudios.map((audio, index) => (
              <div
                key={index}
                className='d-flex justify-content-center bg-white shadow-sm mb-3'
              >
                <Player audio={audio} title={audio.title} />

                <Button
                  onClick={() =>
                    AudioService.download(
                      AudioService.generateAudioLink(audio.fileId),
                      audio.title,
                    )
                  }
                  className='btn-success'
                >
                  <DownloadIcon />
                </Button>

                <Button className='btn-warning'>
                  <EditIcon />
                </Button>

                <Button
                  className='btn-danger'
                  onClick={() => {
                    AudioService.remove(audio.fileId)
                    deleteAudio(audio)
                  }}
                >
                  <DeleteIcon />
                </Button>
              </div>
            ))
          ) : (
            <p className='text-muted mt-4'>Пусто.</p>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default MyProfile
