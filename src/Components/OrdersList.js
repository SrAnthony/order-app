import React, { useState, useEffect } from 'react'
import {
  Container, Header, Content, Title, Body, Right, Text, ListItem, View, Button, Footer 
} from 'native-base'
import Accordion from 'react-native-collapsible/Accordion'
import moment from 'moment'
import { currencyFormatter } from '../Utils/formatters'

export default ({ orders }) => {
  const [active_order, setActiveOrder] = useState([])

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
    <>
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
    </>
  )
}