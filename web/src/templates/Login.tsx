import * as React from 'react'
import styled from 'styled-components'
import logo from "../assets/logo.svg"

type Props ={
    email:string,
    password:string,

    handleChange: (eventOrPath: string | React.ChangeEvent<any>) => void
    handleSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void
}

export const Component = (props:Props) => {
    return (
        <Wrap>
            <Contents>
                <Logo src={logo} />
                <Text>Twitterにログイン</Text>
                <form onSubmit={props.handleSubmit}>
                    <FullInput
                        type='email'
                        name='email'
                        placeholder='メールアドレス'
                    />
                    <FullInput
                        type='password'
                        name='password'
                        placeholder='パスワード'
                    />
                    <LoginButton>ログイン</LoginButton>
                </form>
            </Contents>
        </Wrap>
    )
}

const Text = styled.div`
margin:10px 0;
font-size:19px;
font-weight:bold;
`

const Wrap = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align:center;
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
padding:5px;
margin-bottom:14px;
font-size:19px;
    width: 100%;
    box-sizing: border-box;
`

const LoginButton = styled.button`
border: none;
border-radius:9999px;
outline: none;
width:100%;
height:37px;
color:white;
background-color:#1da1f2;
font-weight:bold;
font-size:15px;
display: block;
`
