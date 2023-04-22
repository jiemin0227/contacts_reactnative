import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import ContactList from './src/pages/ContactList';
import EditContact from './src/pages/EditContact';
import data from './src/data/data.json';
import {writeItemToStorage} from './src/storage/asyncStorage';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    writeItemToStorage(data);
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ContactList"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="ContactList" component={ContactList} />
        <Stack.Screen name="EditContact" component={EditContact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
