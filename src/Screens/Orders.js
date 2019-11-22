import React, { useState, useEffect } from 'react'
import {
  Container, Header, Content, Title, Body, Right, Text, ListItem, View, Button, Footer 
} from 'native-base'
import Accordion from 'react-native-collapsible/Accordion'
import moment from 'moment'
import { currencyFormatter } from '../Utils/formatters'
import { API } from '../Utils/endpoints'

export default ({ navigation }) => {
  const [active_order, setActiveOrder] = useState([])
  const [orders, setOrders] = useState(null)

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

  const renderHeader = order => (
    <View style={{ paddingVertical: 10, borderBottomColor: '#ddd', borderBottomWidth: 1 }}>
      <Title style={{ color: 'black' }}>
        {moment(order.created_date).format('DD/MM/YYYY [às] HH:mm')} {
          !order.finished_date && ' (Aberto)'
        }
      </Title>
    </View>
  )

  const renderContent = order => (
    <View style={{ paddingHorizontal: 20 }}>
      {order.products.map(product => (
        <ListItem key={product.referenceCode}>
          <Body>
            <Text>{product.name}</Text>
          </Body>
          <Right>
            <Text>
              {currencyFormatter(product.price)}
            </Text>
          </Right>
        </ListItem>
      ))}
      <ListItem key="total">
        <Body>
          <Text>
            Total
          </Text>
        </Body>
        <Right>
          <Text>
            {currencyFormatter(order.products.reduce((acc, curr) => curr.price + acc, 0))}
          </Text>
        </Right>
      </ListItem>
    </View>
  )

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
        {
          orders === null
          && <Text>Carregando...</Text>
        }
        <Accordion
          sections={orders || []}
          activeSections={active_order}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={order => setActiveOrder(order)}
        />
      </Content>

      <Footer style={{ backgroundColor: 'transparent' }}>
        {
          (orders || []).some(order => !order.finished_date) ? (
            <Button dark full onPress={closeOrder}>
              <Text>Fechar comanda</Text>
            </Button>
          ) : (
            <Button success full onPress={openOrder}>
              <Text>Abrir comanda</Text>
            </Button>
          )
        }
      </Footer>
    </Container>
  )
}