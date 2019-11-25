import React, { useState, useEffect }  from 'react'
import { Container, Content, List, ListItem, Body, Text, View } from 'native-base'
import CreditCard from 'react-native-credit-card'
import Modal from 'react-native-modal'
import { API } from '../Utils/endpoints'

export default ({ visible }) => {
  const [cards, setCards] = useState(null)

  const getCreditCards = () => {
    API.get(`/api/client/44842704802`)
      .then(result => setCards(result.data.credit_cards))
      .catch(err => console.log(err))
  }

  useEffect(getCreditCards, [])

  return (
    <Modal
      isVisible={visible}
    >
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        {
          cards === null
          && <Text>Carregando...</Text>
        }
        <List>
          {cards && cards.map(card => (
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
      </View>
    </Modal>
  )
}
