import React, { Component } from "react"
import Modal from "react-native-modal"
import { Button, Text, View } from "native-base"
import Icon from 'react-native-vector-icons/FontAwesome'

export default ({ visible, closeModal }) => {

  return (
    <Modal isVisible={visible} onBackdropPress={() => closeModal()}>
      <View style={{ height: 180, backgroundColor: 'white', borderRadius: 10 }}>
        <Icon
          name='check-circle'
          color='#28BF20'
          size={60}
          style={{ textAlign: 'center', padding: 18 }}
        />
        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 20 }}>
          Pagamento efetuado!
        </Text>
        <Button transparent full onPress={closeModal}>
          <Text style={{ color: 'black' }} >
            Ok
          </Text>
        </Button>
      </View>
    </Modal>
  )
}
