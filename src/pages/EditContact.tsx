import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Ionicons';

import {Header} from '../component/header';
import {Button} from '../component/button';
import {PrimaryTextInput} from '../component/textInput';
import {readItemFromStorage, writeItemToStorage} from '../storage/asyncStorage';

const EditContact = ({route, navigation}) => {
  const [dataContact, setDataContact] = useState([]);
  const {itemId} = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const refFirstName = useRef<PrimaryTextInput | null>(null);
  const refLastName = useRef<PrimaryTextInput | null>(null);
  const refEmail = useRef<PrimaryTextInput | null>(null);
  const refPhone = useRef<PrimaryTextInput | null>(null);

  useEffect(() => {
    readItemFromStorage(setDataContact);
  }, []);

  useEffect(() => {
    if (dataContact.length > 0) {
      let dataContactArr = [...dataContact];
      let selectedContact = dataContactArr.find(item => item.id == itemId);
      setFirstName(selectedContact.firstName);
      setLastName(selectedContact.lastName);
      setEmail(selectedContact.email);
      setPhone(selectedContact.phone);
    }
  }, [dataContact]);

  const handleSubmit = () => {
    let dataContactArr = [...dataContact];
    let selectedContactIndex = dataContactArr.findIndex(
      item => item.id == itemId,
    );
    dataContactArr[selectedContactIndex].firstName = firstName;
    dataContactArr[selectedContactIndex].lastName = lastName;
    dataContactArr[selectedContactIndex].email = email;
    dataContactArr[selectedContactIndex].phone = phone;

    writeItemToStorage(dataContactArr);
    navigation.goBack();
  };

  type HeadingProps = {
    title: string;
  };

  const Heading = ({title}: HeadingProps) => (
    <View style={styles.headingContainer}>
      <Text style={styles.textHeading}>{title}</Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Header
        headerLeft={
          <Button title="Cancel" onPress={() => navigation.goBack()} />
        }
        headerRight={<Button title="Save" onPress={() => handleSubmit()} />}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.imageAvatarContainer}>
          <View style={styles.imageAvatar} />
        </View>
        <Heading title="Main Information" />
        <View style={styles.sectionContainer}>
          <PrimaryTextInput
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            ref={refFirstName}
            onSubmitEditing={() => refLastName.current?.focus()}
          />
          <View style={styles.inputSeparator} />
          <PrimaryTextInput
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            ref={refLastName}
            onSubmitEditing={() => refEmail.current?.focus()}
          />
        </View>

        <Heading title="Sub Information" />
        <View style={styles.sectionContainer}>
          <PrimaryTextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            ref={refEmail}
            onSubmitEditing={() => refPhone.current?.focus()}
          />
          <View style={styles.inputSeparator} />
          <PrimaryTextInput
            label="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            ref={refPhone}
          />
          <View style={styles.inputSeparator} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollViewContainer: {
    justifyContent: 'center',
  },
  imageAvatarContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  imageAvatar: {
    height: 120,
    width: 120,
    borderRadius: 120 / 2,
    overflow: 'hidden',
    backgroundColor: '#ff8c00',
  },
  headingContainer: {
    backgroundColor: '#F7F7F7',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  textHeading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionContainer: {
    paddingHorizontal: 10,
  },
  inputSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#D3D2D6',
  },
});

export default EditContact;
