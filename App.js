import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';

import { CustomDrawer } from './navigation/CustomDrawer'

import {configStore, applyMiddleware} from 'redux/';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './stores/rootReducer.js';
const Stack = createStackNavigator();

const store = configStore(
  rootReducer,
  applyMiddleware(thunk)
)

const App = () => {
    return (
        <Provider store={store}>
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Home'}
            >
                <Stack.Screen
                    name="Home"
                    component={CustomDrawer}
                />
            </Stack.Navigator>
        </NavigationContainer>
        </Provider>
        
    )
}

export default App;