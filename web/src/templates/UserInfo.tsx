import * as React from 'react'
import axios from 'axios'
import * as ReactRouter from 'react-router-dom'

import * as Profile from '../pages/Profile'
import * as OtherProfile from '../pages/OtherProfile'

type Props = {
    isMyAccount?:boolean
    username:string
}

export const Component = (props: Props) => {
    const { isMyAccount,username } = props

return <div>{isMyAccount ? <Profile.Component /> : <OtherProfile.Component username={username}/>}</div>
}

