import * as React from 'react'
import styled from 'styled-components'
import axios from 'axios'

type Props = {
  userId: any
}

export const Component = (props: Props) => {
  const { userId } = props
  const [isFollow, setIsFollow] = React.useState(false)
  const toggleFollowUser = async () => {
    const params = new URLSearchParams()
    params.append('userId', userId)
    if (!isFollow) {
      try {
        const response = await axios.post(
          'http://localhost:2001/follow',
          params,
          {
            withCredentials: true
          }
        )
        setIsFollow(true)
      } catch (error) {
        return
      }
    } else {
      try {
        const response = await axios.post(
          'http://localhost:2001/unfollow',
          params,
          {
            withCredentials: true
          }
        )
        setIsFollow(false)
      } catch (error) {
        return
      }
    }
  }

  return (
    <ButtonWrapper>
      {isFollow ? (
        <UnFollowButton onClick={toggleFollowUser}>
          フォローを外す
        </UnFollowButton>
      ) : (
        <FollowButton onClick={toggleFollowUser}>フォローする</FollowButton>
      )}
    </ButtonWrapper>
  )
}

const ButtonWrapper = styled.div`
  margin: 0 0 0 auto;
`

const FollowButton = styled.button`
  border: none;
  border-radius: 9999px;
  outline: none;
  width: 140px;
  height: 30px;
  color: white;
  background-color: #1da1f2;
  font-weight: bold;
  font-size: 15px;
  display: block;

  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`

const UnFollowButton = styled.button`
  border: solid 1px #1da1f2;
  border-radius: 9999px;
  outline: none;
  width: 140px;
  height: 30px;
  color: #1da1f2;
  background-color: white;
  font-weight: bold;
  font-size: 15px;
  display: block;
  margin: 0 0 0 auto;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`
