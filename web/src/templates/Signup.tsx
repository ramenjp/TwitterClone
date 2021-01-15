import * as React from 'react'
import * as Text from '../components/Text'
import styled from 'styled-components'

import logo from '../assets/logo.svg'
type Props = {
  username: string
  email: string
  password: string

  handleChange: (eventOrPath: string | React.ChangeEvent<any>) => void
  handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
}

export const Component = (props: Props) => {
  return (
    <Wrap>
      <Contents>
        <Logo src={logo} />
        <Text.Component text='アカウントを作成' />
        <form onSubmit={props.handleSubmit}>
          <FullInput
            type='text'
            name='username'
            placeholder='ユーザーネーム'
            value={props.username}
            onChange={props.handleChange}
          />
          <FullInput
            type='email'
            name='email'
            placeholder='メールアドレス'
            value={props.email}
            onChange={props.handleChange}
          />
          <FullInput
            type='password'
            name='password'
            placeholder='パスワード'
            value={props.password}
            onChange={props.handleChange}
          />
          <LoginButton>会員登録</LoginButton>
        </form>
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
  &:hover {
    cursor: pointer;
  }
`
