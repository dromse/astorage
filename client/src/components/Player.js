import React, { useEffect, useRef, useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import AudioService from '../service/AudioService'

import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import PauseIcon from '@material-ui/icons/Pause'

const Player = ({ audio, title }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const audioPlayer = useRef()
  const progressBar = useRef()
  const animationRef = useRef()

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration)
    setDuration(seconds)
    progressBar.current.max = seconds
  }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState])

  const audioLink = AudioService.generateAudioLink(audio.fileId)

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60)
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
    const seconds = Math.floor(secs % 60)
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
    return `${returnedMinutes}:${returnedSeconds}`
  }

  const togglePlayPause = () => {
    const prevValue = isPlaying
    setIsPlaying(!prevValue)
    if (!prevValue) {
      audioPlayer.current.play()
      animationRef.current = requestAnimationFrame(whilePlaying)
    } else {
      audioPlayer.current.pause()
      cancelAnimationFrame(animationRef.current)
    }
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime
    changePlayerCurrentTime()
    animationRef.current = requestAnimationFrame(whilePlaying)
  }

  const changeRange = () => {
    audioPlayer.current.currentTime = progressBar.current.value
    changePlayerCurrentTime()
  }

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`,
    )
    setCurrentTime(progressBar.current.value)
  }

  return (
    <Container fluid className='border'>
      <audio ref={audioPlayer} src={audioLink} preload='metadata' />
      <p className='mt-3'>{title}</p>
      <Row>
        <Col>
          <p>
            <Button
              onClick={togglePlayPause}
              className='btn-light btn-outline-primary'
            >
              {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
            </Button>
          </p>

          <p>
            <input
              type='range'
              defaultValue='0'
              ref={progressBar}
              onChange={changeRange}
              className='ms-3'
              style={{ width: '50vw' }}
            />
          </p>

          <p>{calculateTime(currentTime)}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Player
