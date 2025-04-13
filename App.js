import { registerRootComponent } from 'expo'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './app/Home'
import Records from './app/Records'

const Stack = createNativeStackNavigator()

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Records" component={Records} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

registerRootComponent(App)

export default App