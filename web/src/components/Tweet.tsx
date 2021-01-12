import * as React from 'react'
import styled from 'styled-components'
import heart from '../assets/heart.svg'
import pushedHeart from '../assets/pushedHeart.svg'
import retweet from '../assets/retweet.svg'
import pushedRetweet from '../assets/pushedRetweet.svg'
import axios from 'axios'

type Props = {
  tweet: string
  date?: any
  id?:any
}

export const Component = (props: Props) => {
  const [like, setLike] = React.useState(false)
  const [reTweet, setReTweet] = React.useState(false)

  const toggleLike = async () => {

    if(!like) {
        try{
            const res = await axios.post('http://localhost:2001/like',{
            withCredentials:true
           })
           setLike(!like)
        } catch(error) {
            return
        }
    }
    else {
        try{
            const res = await axios.post('http://localhost:2001/dislike',{
            withCredentials:true
           })
           setLike(!like)
        } catch(error) {
            return
        }
    }
  }

  const toggleReTweet = async () => {
    if(!reTweet) {
        try{
            const res = await axios.get('http://localhost:2001/reTweet',{
            withCredentials:true
           })
           setReTweet(!reTweet)
        } catch(error) {
            return
        }
    }
    else {
        try{
            const res = await axios.get('http://localhost:2001/deleteReTweet',{
            withCredentials:true
           })
           setReTweet(!reTweet)
        } catch(error) {
            return
        }
    }
  }

  const { tweet } = props
  return (
    <Tweet>
     
      {tweet}
      <div>{props.date} :{props.id}</div>
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
  display:flex;
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
