import React from 'react'
import { Content, Container, Form, Item, Input, Label, Button, Icon, Text } from 'native-base'

export default () => {

  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input />
          </Item>
          <Item floatingLabel last>
            <Label>Senha</Label>
            <Input secureTextEntry={true} />
          </Item>
        </Form>

        <Button block style={{ marginTop: 40 }} success iconLeft>
          <Icon name='people' />
          <Text>Entrar</Text>
        </Button>
        <Button block style={{ marginTop: 10 }} primary>
          <Icon name='paper' />
          <Text>Cadastrar</Text>
        </Button>
      </Content>
    </Container>
  )
}
