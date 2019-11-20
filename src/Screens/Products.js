import React from 'react'
import { Container, Header, Content, Title, Body, Right, Text, ListItem } from 'native-base'
import { currencyFormatter } from '../Utils/formatters'

export default ({ navigation }) => {
  const products = [
    {
      id: 1,
      name: 'Cerveja',
      price: 15.50,
    },
    {
      id: 2,
      name: 'Refrigerante',
      price: 10,
    },
    {
      id: 3,
      name: 'Caipirinha',
      price: 21.50,
    },
  ]

  return (
    <Container>
      <Header>
        <Body>
          <Title>
            Cardápio
          </Title>
        </Body>
      </Header>

      <Content>
        {products.map(product => (
          <ListItem key={product.id}>
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
      </Content>

    </Container>
  )
}