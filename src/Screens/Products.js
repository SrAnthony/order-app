import React, { useState, useEffect } from 'react'
import { Container, Header, Content, Title, Body, Right, Text, ListItem } from 'native-base'
import { currencyFormatter } from '../Utils/formatters'
import { API } from '../Utils/endpoints'

export default ({ navigation }) => {
  const [products, setProducts] = useState(null)

  const getProducts = () => {
    API.get('/api/Product')
      .then(result => setProducts(result.data))
      .catch(err => console.log(err))
  }

  useEffect(getProducts, [])

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
        {
          products === null
          && <Text>Carregando...</Text>
        }
        {products && products.map(product => (
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
      </Content>

    </Container>
  )
}