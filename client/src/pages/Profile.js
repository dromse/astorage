import React, { useContext, useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'react-bootstrap'
import { AuthContext } from '../context/AuthContext'
import AudioService from '../service/AudioService'
import Player from '../components/Player'
import { Button } from 'react-bootstrap'
import useFetchAudios from '../hooks/useFetchAudio'
import DeleteIcon from '@material-ui/icons/Delete'

const Profile = () => {
  const { user } = useContext(AuthContext)
  const [userAudios, setUserAudios] = useState([])

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
        Something went wrong...
      </h1>
    )
  }

  return (
    <Container>
      <Row>
        <Col className='bg-light text-center'>
          <h6 className='border border-success'>User Info</h6>
          <h6>{user.username}</h6>
          <h6 className='border border-primary'>User audios</h6>

          {userAudios.length !== 0 ? (
            userAudios.map((audio, index) => (
              <div
                key={index}
                className='d-flex justify-content-center border'
              >
                <Player audio={audio} title={audio.title} />
              </div>
            ))
          ) : (
            <h6>Empty.</h6>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
