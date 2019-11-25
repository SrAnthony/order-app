import React, {useState} from 'react';
import CreditCard from 'react-native-credit-card';
import { Content, Container, Form, Item, Input, Label, Body, Button, Text } from 'native-base'
import { API } from '../Utils/endpoints'

export default function CreditCardRegister({navigation}) {

    const [name, setName] = useState('')
    const [last_name, setLastName] = useState('')
    const [card_number, setCardNumber] = useState('')
    const [expiring_date, setExpiringDate] = useState('')
    const [cpf_holder, setCpfHolder] = useState('')

    const addCreditCard = () => {
      API.post("/api/Client/addcreditcard?cpf=44842704802",
          {
            card_number: card_number,
            expiring_date: expiring_date,
            name: name,
            last_name: last_name,
            cpf_holder: cpf_holder
          })
        .then(result => { console.log(result);})
        .catch(err => console.log(err));
    }

    return (
      <Container>
        <Content>
          <Body>
          <CreditCard style={{marginBottom:10}}
                  number={card_number}
                  name={name + " " + last_name}
                  expiry={expiring_date}/>
          </Body>
          <Form>
              <Item floatingLabel>
                <Label>Número do Cartão</Label>
                <Input value={card_number} onChangeText={setCardNumber} />
              </Item>
              <Item floatingLabel>
                <Label>Data de Expiração</Label>
                <Input value={expiring_date} onChangeText={setExpiringDate} />
              </Item>
              <Item floatingLabel>
                <Label>Nome do Títular</Label>
                <Input value={name} onChangeText={setName} />
              </Item>
              <Item floatingLabel>
                <Label>Sobrenome do Títular</Label>
                <Input value={last_name} onChangeText={setLastName} />
              </Item>
              <Item floatingLabel>
                <Label>CPF do títular</Label>
                <Input value={cpf_holder} onChangeText={setCpfHolder} />
              </Item>
              <Button block style={{ marginTop: 10 }} onPress={
                () => {
                  addCreditCard()
                  navigation.navigate('Orders')
                }
              } primary>
                <Text>Cadastrar</Text>
              </Button>
          </Form>
        </Content>
      </Container>
    );
}

CreditCardRegister.navigationOptions = {
  title: 'Adicionar Novo Cartão',
}