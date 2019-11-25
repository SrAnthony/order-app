import React, {useState, useEffect} from 'react'
import { Content, Container, Form, Item, Input, Label, Button, Icon, Text, Toast } from 'native-base'
import { API } from '../Utils/endpoints'

export default ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => {
    API.post('/api/Client/login', {email_cpf: email, password: password})
      .then(response => {
          if (response.data.result){
            Toast.show({
              text: 'Login efetuado!'
            })
            navigation.navigate('Orders')
          }else{
            Toast.show({
              text: 'Wrong Password or Email!'
            })
          }
      })    
      .catch(err => console.log(err))
  }

  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input value={email} on onChangeText={setEmail}/>
          </Item>
          <Item floatingLabel last>
            <Label>Senha</Label>
            <Input secureTextEntry={true} value={password} onChangeText={setPassword}/>
          </Item>
        </Form>

        <Button block style={{ marginTop: 40 }} success iconLeft>
          <Icon name='people' />
          <Text  onPress={submit}>Entrar</Text>
        </Button>
        <Button block style={{ marginTop: 10 }} primary>
          <Icon name='paper' />
          <Text>Cadastrar</Text>
        </Button>
      </Content>
    </Container>
  )
}
