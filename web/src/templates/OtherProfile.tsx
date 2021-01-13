import * as React from 'react'
import * as ReactRouter from 'react-router-dom'
import styled from 'styled-components'
import * as Tweet from '../components/Tweet'

type Props = {
    user?:any
    tweet?:any
}

export const Component = (props:Props) => {
    const { user,tweet } = props;
    const renderTweet = () => {
        const tweetKeyList = Object.keys(tweet)
        return tweetKeyList.map( key => {
            return <Tweet.Component key={key} tweet={tweet[key].Content}/>
        })
    }
    return (
        <Wrapper>
            <StyledLink>
            <ReactRouter.Link to="/top">
            <Text>ホームに戻る</Text>
            </ReactRouter.Link>
            </StyledLink>
        <div>
             <ProfileWrapper>
                <Name>{user.Name}</Name>
                <UserName>@{user.UserName}</UserName>
                <Bio>{user.Bio}</Bio>
            </ProfileWrapper>
            <Menu>
                {/* <MenuItem onClick={toggleTweetContent}>ツイート</MenuItem>
                <MenuItem onClick={toggleLikeContent}>いいね</MenuItem> */}
            </Menu>
            <DisplayContent>
               <ul>{renderTweet()}</ul>
            </DisplayContent>
        </div>
    </Wrapper>
    )
    
}
 

const Wrapper = styled.div`
padding:40px;
  width:40%;
  margin:0 auto;
`

const ProfileWrapper = styled.div`
  padding:15px;
`

const Name = styled.div`
  font-weight:bold;
  font-size:19px;
`

const Menu = styled.div`
  display:flex;
`

const Bio = styled.div`
  font-size:15px;

`

const MenuItem = styled.div`
  font-weight:bold;
  width:50%;
  text-align:center;
  padding:15px;
  &:hover{
      cursor: pointer;
      color: #1da1f2;
  }
`

const DisplayContent = styled.div`

`

const EditButton = styled.button`
  border-color: #1da1f2;
  border-width:1px;
  border-radius: 9999px;
  outline: none;
  width: 167px;
  height: 40px;
  color: #1da1f2;
  background-color:white;
  font-weight: bold;
  font-size: 15px;
  display: block;
  margin: 0 0 0 auto;
  text-decoration: none;
  &:hover {
    cursor: pointer;
  }
`

const FullInput = styled.input`
padding:5px;
margin-bottom:14px;
font-size:19px;
    width: 100%;
    box-sizing: border-box;
`

const FullInputArea = styled.textarea`
padding:15px;
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
margin-bottom:30px;
&:hover {
    cursor:pointer
}
`

const Text = styled.div`
margin:10px 0;
font-size:19px;
font-weight:bold;
`

const UserName = styled.div`
  color:#5b7083;
  font-size:15px;
  margin-bottom:10px;
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