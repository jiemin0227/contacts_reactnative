import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ContactList from './src/pages/ContactList';
import EditContact from './src/pages/EditContact';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ContactList">
        <Stack.Screen name="ContactList" component={ContactList} />
        <Stack.Screen name="EditContact" component={EditContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
