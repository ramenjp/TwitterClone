import * as React from 'react'
import styled from 'styled-components'
import axios from 'axios'

import heart from '../assets/heart.svg'
import pushedHeart from '../assets/pushedHeart.svg'
import retweet from '../assets/retweet.svg'
import pushedRetweet from '../assets/pushedRetweet.svg'

type Props = {
  tweet: string
  date?: any
  id?: any
}

type Tweet = {
  content: string
  date?: any
  id?: any
}

export const Component = (props: Props) => {
  const { tweet, date, id } = props
  const time = date.substring(0, 16).replace('T', ' ') //サーバー側でやりたい。
  const [like, setLike] = React.useState(false)
  const [reTweet, setReTweet] = React.useState(false)

  const toggleLike = async () => {
    const tweetId = id
    const params = new URLSearchParams()
    params.append('tweetId', tweetId)
    if (!like) {
      try {
        const res = await axios.post('http://localhost:2001/like', params, {
          withCredentials: true
        })
        setLike(!like)
      } catch (error) {
        return
      }
    } else {
      try {
        const res = await axios.post('http://localhost:2001/dislike', params, {
          withCredentials: true
        })
        setLike(!like)
      } catch (error) {
        return
      }
    }
  }

  const toggleReTweet = async () => {
    const tweetId = id
    const params = new URLSearchParams()
    params.append('tweetId', tweetId)
    if (!reTweet) {
      try {
        const params = new URLSearchParams()
        params.append('tweetId', id)
        const res = await axios.post('http://localhost:2001/reTweet', params, {
          withCredentials: true
        })
        setReTweet(!reTweet)
      } catch (error) {
        console.log('error')
        return
      }
    } else {
      try {
        const params = new URLSearchParams()
        params.append('tweetId', tweetId)
        const res = await axios.post(
          'http://localhost:2001/deleteReTweet',
          params,
          {
            withCredentials: true
          }
        )
        setReTweet(!reTweet)
      } catch (error) {
        return
      }
    }
  }

  return (
    <Tweet>
      {tweet}
      <Date>{time}</Date>
      <Share>
        <LikeWrapper onClick={toggleLike}>
          {like ? <Like src={pushedHeart} /> : <Like src={heart} />}
        </LikeWrapper>
        <ReTweetWrapper onClick={toggleReTweet}>
          {reTweet ? (
            <ReTweet src={pushedRetweet} />
          ) : (
            <ReTweet src={retweet} />
          )}
        </ReTweetWrapper>
      </Share>
    </Tweet>
  )
}

const Tweet = styled.div`
  border-bottom: 1px solid #a0a0a0;
  font-size: 15px;
  padding: 20px 0 20px 50px;
  text-align: left;
  display: column;
`

const Share = styled.div`
  padding-top: 10px;
  display: flex;
`

const ReTweet = styled.img`
  width: 19px;
  height: 19px;
`

const Like = styled.img`
  width: 19px;
  height: 19px;
  margin-right: 30px;
`

const LikeWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`

const ReTweetWrapper = styled.div`
  &:hover {
    cursor: pointer;
  }
`

const Date = styled.div``
