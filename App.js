import { registerRootComponent } from 'expo'
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from './app/Home'
import Records from './app/Records'
import Dashboard from './app/Dashboard'

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const HomeStack = () => (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    </Stack.Navigator>
)

const RecordsStack = () => (
    <Stack.Navigator initialRouteName="Records">
        <Stack.Screen name="Records" component={Records} options={{ headerShown: false }} />
    </Stack.Navigator>
)

const DashboardStack = () => (
    <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
    </Stack.Navigator>
)

const App = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="Dashboard" screenOptions={{ headerShown: false }}>
                <Tab.Screen name="Home" component={HomeStack} />
                <Tab.Screen name="Records" component={RecordsStack} />
                <Tab.Screen name="Dashboard" component={DashboardStack} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

registerRootComponent(App)

export default App