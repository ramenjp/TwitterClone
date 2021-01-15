import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
import styled from 'styled-components'

import * as Text from '../components/Text'
import logo from '../assets/logo.svg'

type Props = {
  username: string
  password: string

  handleChange: (eventOrPath: string | React.ChangeEvent<any>) => void
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
}

export const Component = (props: Props) => {
  return (
    <Wrap>
      <Contents>
        <Logo src={logo} />
        <Text.Component text='Twitterにログイン' />
        <form onSubmit={props.handleSubmit}>
          <FullInput
            type='text'
            name='username'
            placeholder='ユーザーネーム'
            value={props.username}
            onChange={props.handleChange}
          />
          <FullInput
            type='password'
            name='password'
            placeholder='パスワード'
            onChange={props.handleChange}
          />
          <LoginButton>ログイン</LoginButton>
        </form>
        <StyledLink>
          <ReactRouter.Link to='signup'>
            <LoginButton>会員登録</LoginButton>
          </ReactRouter.Link>
        </StyledLink>
      </Contents>
    </Wrap>
  )
}

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  height: 100vh;
`

const Contents = styled.div`
  max-width: 620px;
`
const Logo = styled.img`
  width: 50px;
  height: 50px;
`

const FullInput = styled.input`
  padding: 5px;
  margin-bottom: 14px;
  font-size: 19px;
  width: 100%;
  box-sizing: border-box;
`

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

const StyledLink = styled.div`
  a {
    text-decoration: none;
    color: black;
    &:hover {
      color: #1da1f2;
    }
  }
`
