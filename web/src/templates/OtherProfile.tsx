import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
import styled from 'styled-components'

import * as Tweet from '../components/Tweet'
import * as Text from '../components/Text'
import * as Interface from '../interface/interface'

type Props = {
  user?: any
  tweets?: any
}
export const Component = (props: Props) => {
  const { tweets, user } = props
  const [content, setContent] = React.useState(true)
  console.log('props. user', user)
  console.log('props. tweets', tweets)

  const renderTweet = () => {
    const tweetKeyList = Object.keys(tweets)
    return tweetKeyList.map(key => {
      const keyNum = parseInt(key)
      return <Tweet.Component key={key} tweet={tweets[keyNum]} />
    })
  }

  const toggleTweetContent = () => {
    setContent(true)
  }
  const toggleLikeContent = () => {
    setContent(false)
  }

  return (
    <Wrapper>
      <StyledLink>
        <ReactRouter.Link to='/top'>
          <Text.Component text='ホームに戻る' />
        </ReactRouter.Link>
      </StyledLink>
      <div>
        <ProfileWrapper>
              <Name>{user.Name}</Name>
              <UserName>@{user.UserName}</UserName>
              <Bio>{user.Bio}</Bio>
        </ProfileWrapper>
        <Menu>
          <MenuItem onClick={toggleTweetContent}>ツイート</MenuItem>
          <MenuItem onClick={toggleLikeContent}>いいね</MenuItem>
        </Menu>
        <DisplayContent>
            {/* <ul>{renderTweet()}</ul> */}
        </DisplayContent>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 40px;
  width: 40%;
  margin: 0 auto;
`

const ProfileWrapper = styled.div`
  padding: 15px;
`

const Name = styled.div`
  font-weight: bold;
  font-size: 19px;
`

const Menu = styled.div`
  display: flex;
`

const Bio = styled.div`
  font-size: 15px;
`

const MenuItem = styled.div`
  font-weight: bold;
  width: 50%;
  text-align: center;
  padding: 15px;
  &:hover {
    cursor: pointer;
    color: #1da1f2;
  }
`

const DisplayContent = styled.div``

const LoginButton = styled.button`
  border: none;
  border-radius: 9999px;
  outline: none;
  width: 100%;
  height: 37px;
  color: white;
  background-color: #1da1f2;
  font-weight: bold;
  font-size: 15px;
  display: block;
  margin-bottom: 30px;
  &:hover {
    cursor: pointer;
  }
`

const UserName = styled.div`
  color: #5b7083;
  font-size: 15px;
  margin-bottom: 10px;
`

const StyledLink = styled.div`
  a {
    text-decoration: none;
    color: black;
    &:hover {
      color: #1da1f2;
    }
  }
`
