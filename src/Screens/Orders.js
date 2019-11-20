import React, { useState } from 'react'
import { Container, Header, Content, Title, Body, Right, Text, ListItem, Separator, View, List } from 'native-base'
import { currencyFormatter } from '../Utils/formatters'
import Accordion from 'react-native-collapsible/Accordion'

export default ({ navigation }) => {
  const [active_order, setActiveOrder] = useState([])

  const orders = [
    {
      referenceCode: 1,
      created_date: '10/10/19 às 23:40',
      finished_date: '11/10/19 às 04:30',
      status: 0,
      products: [
        {
          referenceCode: 1,
          quantity: 1,
          name: 'Bolacha',
          price: 12,
        },
        {
          referenceCode: 2,
          quantity: 1,
          name: 'Cerveja',
          price: 10,
        },
      ]
    },
    {
      referenceCode: 2,
      created_date: '12/10/19 às 23:40',
      finished_date: '13/10/19 às 04:30',
      status: 0,
      products: [
        {
          referenceCode: 1,
          quantity: 1,
          name: 'Bolacha',
          price: 12,
        },
        {
          referenceCode: 2,
          quantity: 1,
          name: 'Cerveja',
          price: 10,
        },
      ]
    },
  ]

  const renderHeader = order => (
    <View style={{ paddingVertical: 10, borderBottomColor: '#ddd', borderBottomWidth: 1 }}>
      <Title style={{ color: 'black' }}>
        Comanda #{order.referenceCode} ({order.created_date})
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
        <Accordion
          sections={orders}
          activeSections={active_order}
          renderHeader={renderHeader}
          renderContent={renderContent}
          onChange={order => setActiveOrder(order)}
        />
      </Content>
    </Container>
  )
}