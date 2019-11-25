import React, { useState, useEffect }  from 'react'
import { Container, Content, List, ListItem, Body } from 'native-base'
import { API } from '../Utils/endpoints'
import CreditCard from 'react-native-credit-card';
import ActionButton from 'react-native-action-button';

export default function CreditCards({navigation}) {

    const [cards, setCards] = useState([])

    const getCreditCards = () => {
        API.get("/api/client")
        .then(result => { console.log(result); setCards(result.data[0].credit_cards)})
        .catch(err => console.log(err));
    }

    useEffect(getCreditCards, [])

    return (
      <Container>
      <Content>
        <List>
          {cards.map(card => (
            <ListItem key={card.card_number}>
              <Body>
              <CreditCard
                number={card.card_number}
                name={card.name + " " + card.last_name}
                expiry={card.expiring_date}/>
              </Body>
            </ListItem>
          ))}
        </List>
      </Content>
      <ActionButton
          buttonColor="rgba(231,76,60,1)"
          onPress={() => {navigation.navigate('CreditCardRegister')}}
      />
    </Container>
  )
}

CreditCards.navigationOptions = {
  title: "Cartões",
}

