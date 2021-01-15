import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
import styled from 'styled-components'

import * as Text from '../components/Text'
import allowleft from '../assets/arrow-left.svg'

type Props = {
  username: string
  followUsers: any
}

export const Component = (props: Props) => {
  const { followUsers, username } = props

  const renderUsers = () => {
    const usersKeyList = Object.keys(followUsers)
    return usersKeyList.map(key => {
      const keyNum = parseInt(key)
      return (
        <UserList key={keyNum}>
          <StyledLink>
            <ReactRouter.Link to={`/${followUsers[keyNum].UserName}`}>
              <UserListItem>{followUsers[keyNum].UserName}</UserListItem>
            </ReactRouter.Link>
          </StyledLink>
        </UserList>
      )
    })
  }

  return (
    <Wrapper>
      <ContentWrapper>
        <ReactRouter.Link to={`/${username}`}>
          <Logo src={allowleft} />
        </ReactRouter.Link>
        <Text.Component text={`@${username}`} />
      </ContentWrapper>
      <ul>{renderUsers()}</ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  padding: 50px;
`
const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const UserList = styled.div``

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
const Logo = styled.img`
  width: 35px;
  height: 35px;
`
