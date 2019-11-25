import React, { useState, useEffect }  from 'react'
import { TouchableOpacity } from 'react-native'
import { Container, Content, List, ListItem, Body, Text, View, Button, Footer } from 'native-base'
import CreditCard from 'react-native-credit-card'
import Modal from 'react-native-modal'
import { API } from '../Utils/endpoints'

export default ({ visible, closeModal, onCardSelect, navigation }) => {
  const [cards, setCards] = useState(null)
  count = 0

  const getCreditCards = () => {
    if(visible){
      API.get(`/api/client/44842704802`)
        .then(result => setCards(result.data.credit_cards))
        .catch(err => console.log(err))
    }
  }

  useEffect(getCreditCards, [visible])

  const selectCard = card => {
    closeModal()
    onCardSelect()
  }

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={() => closeModal()}
    >
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <Container>
          <Content>
            {
              cards === null
              && <Text>Carregando...</Text>
            }
            <List>
              {cards && cards.map(card => (
                <ListItem key={count++}>
                  <Body>
                    <CreditCard
                      style={{ marginVertical: 10, marginHorizontal: 10, marginBottom: 0, elevation: 3, alignSelf: 'center' }}
                      imageFront={require('../images/card-front.png')}
                      imageBack={require('../images/card-back.png')}
                      number={card.card_number}
                      name={card.name + " " + card.last_name}
                      expiry={card.expiring_date}
                    />
                    <Button onPress={() => selectCard(card)}>
                      <Text>Selecionar</Text>
                    </Button>
                  </Body>
                </ListItem>
              ))}
            </List>
          </Content>
          <Footer>
            <Button block onPress={() => { closeModal(); navigation.navigate('CreditCardRegister') }}>
              <Text>Adicionar cartão</Text>
            </Button>
            <Button block  style={{ marginHorizontal: 10 }} onPress={() => { closeModal(); }}>
              <Text>Fechar</Text>
            </Button>
          </Footer>
        </Container>
      </View>
    </Modal>
  )
}
