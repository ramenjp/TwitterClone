import * as React from 'react'
import styled from 'styled-components'

type Props = {
  text: string
}

export const Component = (props: Props) => {
  const { text } = props
  return <Text>{text}</Text>
}

const Text = styled.div`
  margin: 10px 0;
  font-size: 19px;
  font-weight: bold;
`
