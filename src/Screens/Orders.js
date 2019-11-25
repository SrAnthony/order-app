import React, { useState, useEffect } from 'react'
import {
  Container, Header, Content, Title, Body, Text, Button, Footer 
} from 'native-base'
import { API } from '../Utils/endpoints'
import OrdersList from '../Components/OrdersList'
import SelectCard from '../Components/SelectCard'
import PaymentModal from '../Components/PaymentModal'

export default ({ navigation }) => {
  const [orders, setOrders] = useState(null)
  const [select_card_modal_visible, setSelectCardModalVisible] = useState(false)
  const [payment_modal_visible, setPaymentModalVisible] = useState(false)

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
    const order_code = orders.find(order => !order.finished_date).referenceCode

    API.put(`/api/Order/${order_code}/close`)
      .then(getOrders)
      .catch(err => console.log(err))
  }

  const handleCloseOrder = () => {
    setSelectCardModalVisible(true)
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
            <Button dark full onPress={handleCloseOrder}>
              <Text>Pagar e fechar comanda</Text>
            </Button>
          ) : (
            <Button success full onPress={openOrder}>
              <Text>Abrir comanda</Text>
            </Button>
          )
        }
      </Footer>

      <SelectCard
        visible={select_card_modal_visible}
        closeModal={() => setSelectCardModalVisible(false)}
        onCardSelect={() => {
          setPaymentModalVisible(true)
          closeOrder()
        }}
      />

      <PaymentModal
        visible={payment_modal_visible}
        closeModal={() => setPaymentModalVisible(false)}
      />
    </Container>
  )
}