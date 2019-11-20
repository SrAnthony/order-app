import React from 'react'
import { Container, Header, Content, Title, Text, Body } from 'native-base'

export default ({ navigation }) => {

  return (
    <Container>
      <Header>
        <Body>
          <Title>
            Home
          </Title>
        </Body>
      </Header>

      <Content>
        <Text>
          oi eu sou um texto
        </Text>
      </Content>

    </Container>
  )
}