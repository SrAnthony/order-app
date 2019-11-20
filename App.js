import React, { useState, useEffect } from 'react'
import { View, Platform } from 'react-native'
import { NavigationNativeContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaProvider, useSafeArea } from 'react-native-safe-area-context'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import Home from './src/Screens/Home'
import Profile from './src/Screens/Profile'
import Products from './src/Screens/Products'
import Orders from './src/Screens/Orders'

if (Platform.OS === 'android') {
  require('intl')
  require('intl/locale-data/jsonp/pt-BR')
}

const Tab = createBottomTabNavigator()

const App = () => {
  const insets = useSafeArea()
  const [is_ready, setIsReady] = useState(false)

  const loadFonts = async () => {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    })

    setIsReady(true)
  }

  useEffect(() => {
    loadFonts()
  }, [])

  if (!is_ready)
    return (<AppLoading />)

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <NavigationNativeContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName

              if (route.name === 'Home') {
                iconName = `ios-information-circle${focused ? '' : '-outline'}`
              } else if (route.name === 'Profile') {
                iconName = `ios-options`
              }

              return <Ionicons name={iconName || 'ios-options'} size={size} color={color} />
            },
          })}
        >
          <Tab.Screen name="Orders" component={Orders} />
          <Tab.Screen name="Products" component={Products} />
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
      </NavigationNativeContainer>
    </View>
  )
}

export default () => (
  <SafeAreaProvider>
    <App /> 
  </SafeAreaProvider>
)