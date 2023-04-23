import {NavigationContainer} from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import ContactList from './src/pages/ContactList';
import EditContact from './src/pages/EditContact';
import data from './src/data/data.json';
import {writeItemToStorage} from './src/storage/asyncStorage';

type RootStackParamList = {
  ContactList: undefined;
  EditContact: {
    itemId: string;
  };
};

export type NavigationProps = NativeStackScreenProps<RootStackParamList>;
export type EditContactNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'EditContact'
>;

const Stack = createNativeStackNavigator<RootStackParamList>();

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
