import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { NavigationNativeContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'
import { SafeAreaProvider, useSafeArea } from 'react-native-safe-area-context'
import * as Font from 'expo-font'
import { AppLoading } from 'expo'

import Home from './src/Screens/Home'
import Profile from './src/Screens/Profile'

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
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = `ios-information-circle${focused ? '' : '-outline'}`;
              } else if (route.name === 'Profile') {
                iconName = `ios-options`;
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{ title: 'Início' }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{ title: 'Perfil' }}
          />
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