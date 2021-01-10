import * as React from 'react'
import styled from 'styled-components'

type Props = {
    text:string;
}


export const Component = (props:Props) => {
<StyledLink>{props.text}</StyledLink>
}

const StyledLink = styled.div`
  a {
    text-decoration: none;
    color: black;
    &:hover {
        color: #1da1f2;
    }
  }
` 