import React, { useState, useEffect } from 'react'
import {
  Container, Header, Content, Title, Body, Right, Text, ListItem, View, Button, Footer 
} from 'native-base'
import Accordion from 'react-native-collapsible/Accordion'
import { API } from '../Utils/endpoints'
import OrdersList from '../Components/OrdersList'
import SelectCard from '../Components/SelectCard'

export default ({ navigation }) => {
  const [orders, setOrders] = useState(null)
  const [select_card_modal_visible, setSelectCardModalVisible] = useState(false)

  const getOrders = () => {
    API.get(`/api/Order?clientCpf=44842704802`)
      .then(result => setOrders(result.data))
      .catch(err => console.log(err))
  }

  useEffect(getOrders, [])

  const openOrder = () => {
    API.post('/api/Order/open', { client_cpf: '44842704802' })
      .then(getOrders)
      .catch(err => console.log(err))
  }

  const closeOrder = () => {
    setSelectCardModalVisible(true)
    // const order_code = orders.find(order => !order.finished_date).referenceCode

    // API.put(`/api/Order/${order_code}/close`)
    //   .then(getOrders)
    //   .catch(err => console.log(err))
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>
            Comandas
          </Title>
        </Body>
      </Header>

      <Content>

        <OrdersList orders={orders} />

      </Content>

      <Footer style={{ backgroundColor: 'transparent' }}>
        {
          (orders || []).some(order => !order.finished_date) ? (
            <Button dark full onPress={closeOrder}>
              <Text>Pagar e fechar comanda</Text>
            </Button>
          ) : (
            <Button success full onPress={openOrder}>
              <Text>Abrir comanda</Text>
            </Button>
          )
        }
      </Footer>

      <SelectCard visible={select_card_modal_visible} />
    </Container>
  )
}