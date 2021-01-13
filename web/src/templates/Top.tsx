import * as React from 'react'
import styled from 'styled-components'
import * as ReactRouter from 'react-router-dom'
import * as Tweet from '../components/Tweet'
import * as FollowButton from '../components/FollowButton'

type Props = {
  user?: any
  users?: any
  tweets?: any
  content?: any
  logout: () => void

  handleChange: (eventOrPath: string | React.ChangeEvent<any>) => void
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
}

export const Component = (props: Props) => {
  const { user, users, tweets } = props

  const renderTweets = () => {
    const tweetKeyList = Object.keys(tweets)

    return tweetKeyList.map(key => {
      return (
        <Tweet.Component
          key={key}
          tweet={tweets[key].Content}
          date={tweets[key].CreatedAt}
          id={tweets[key].ID}
        />
      )
    })
  }

  const renderUsers = () => {
    const usersKeyList = Object.keys(users)
    return usersKeyList.map(item => {
      return (
        <UserList key={item}>
          <StyledLink>
            <ReactRouter.Link to={`/${users[item].UserName}/profile`}>
              <UserListItem>{users[item].UserName}</UserListItem>
            </ReactRouter.Link>
          </StyledLink>
          <FollowButton.Component userId={users[item].ID} />
        </UserList>
      )
    })
  }

  return (
    <MainWrapper>
      <ContentWrapper>
        <ul>
          <SidebarItem>ログインID：{user.UserName}</SidebarItem>
          <SidebarItem>
            <ReactRouter.Link to={`${user.UserName}/profile`}>
              プロフィール
            </ReactRouter.Link>
          </SidebarItem>
          <SidebarItem onClick={props.logout}>ログアウト</SidebarItem>
        </ul>
      </ContentWrapper>
      <ContentWrapper>
        <Home>ホーム</Home>
        <form onSubmit={props.handleSubmit}>
          <FullInput
            type='text'
            name='content'
            placeholder='今どうしてる？'
            onChange={props.handleChange}
            value={props.content}
          />
          <TweetButton type='submit'>ツイートする</TweetButton>
        </form>
        <TweetList>{renderTweets()}</TweetList>
      </ContentWrapper>
      <ContentWrapper>
        <Text>User List</Text>
        <ul>{renderUsers()}</ul>
      </ContentWrapper>
    </MainWrapper>
  )
}

const SidebarItem = styled.li`
  line-height: 45px;
  width: 255px;
  font-size: 19px;
  font-weight: bold;
  color: black;
  list-style: none;
  &:hover {
    color: #1da1f2;
    cursor: pointer;
  }
  a {
    text-decoration: none;
  }
`

const MainWrapper = styled.div`
  margin: 40px;
  display: flex;
`

const ContentWrapper = styled.div`
  width: calc(100% / 3);
  text-align: center;
`

const Home = styled.div`
  font-weight: bold;
  font-size: 19px;
  text-align: left;
`

const FullInput = styled.input`
  font-size: 19px;
  height: 50px;
  border: none;
  outline: none;
  width: 100%;
  border-bottom: 1px solid #a0a0a0;
  margin-bottom: 20px;
`

const TweetButton = styled.button`
  border: none;
  border-radius: 9999px;
  outline: none;
  width: 120px;
  height: 37px;
  color: white;
  background-color: #1da1f2;
  font-weight: bold;
  font-size: 15px;
  display: block;
  margin: 0 0 0 auto;
`

const UserList = styled.div`
  display: flex;
`

const UserListItem = styled.div`
  list-style: none;
  font-weight: bold;
  margin-bottom: 15px;
  text-decoration: none;
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

const TweetList = styled.div`
  margin-top: 20px;
  width: 100%;
  border: 1px solid #a0a0a0;
  border-bottom: none;
`

const Text = styled.div`
  margin: 15px 0;
  font-size: 19px;
  font-weight: bold;
`