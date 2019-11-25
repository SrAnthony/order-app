import React, { useState } from 'react'
import { Container, Content, Form, Item, Input, Label, Button, Text, Toast } from 'native-base'
import { API } from '../Utils/endpoints'

export default ({ navigation }) => {
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const submit = () => {
    if (password != confirmPassword) {
      return Toast.show({
        text: 'Senhas não correspondentes!',
        buttonText: 'Ok'
      })
    }

    API.post('api/Client', { name, cpf, phone, email, password })
    .then(() => {
      navigation.navigate('Orders')
    })
    .catch(err => console.log(err))
  }

  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Nome Completo</Label>
            <Input value={name} onChangeText={setName} />
          </Item>
          <Item floatingLabel>
            <Label>CPF</Label>
            <Input value={cpf} onChangeText={setCpf} />
          </Item>
          <Item floatingLabel>
            <Label>Telefone</Label>
            <Input value={phone} onChangeText={setPhone} />
          </Item>
          <Item floatingLabel>
            <Label>E-mail</Label>
            <Input value={email} onChangeText={setEmail} />
          </Item>
          <Item floatingLabel last>
            <Label>Senha</Label>
            <Input secureTextEntry value={password} onChangeText={setPassword} />
          </Item>
          <Item floatingLabel last>
            <Label>Confirmar Senha</Label>
            <Input secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
          </Item>
        </Form>
        <Button block style={{ marginTop: 40 }} primary onPress={ submit }>
          <Text>Cadastrar</Text>
        </Button>
      </Content>
    </Container>
  )
}
