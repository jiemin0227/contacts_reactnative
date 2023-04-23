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
import {Header} from '../component/header';
import {Button} from '../component/button';
import {PrimaryTextInput} from '../component/textInput';
import {readItemFromStorage, writeItemToStorage} from '../storage/asyncStorage';
import {EditContactNavigationProps} from '../../App';
import {ContactItemProps} from './ContactList';

type ErrorMessageProps = {
  field: string;
  message: string;
};

const EditContact = ({route, navigation}: EditContactNavigationProps) => {
  const [dataContact, setDataContact] = useState([]);
  const {itemId} = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState<string | undefined>('');
  const [phone, setPhone] = useState<string | undefined>('');
  const [errorMessage, setErrorMessage] = useState<ErrorMessageProps[]>([]);

  const refFirstName = useRef<TextInput>(null);
  const refLastName = useRef<TextInput>(null);
  const refEmail = useRef<TextInput>(null);
  const refPhone = useRef<TextInput>(null);

  useEffect(() => {
    readItemFromStorage(setDataContact);
  }, []);

  useEffect(() => {
    if (dataContact.length > 0) {
      let dataContactArr: ContactItemProps[] = [...dataContact];
      let selectedContact = dataContactArr.find(item => item.id == itemId);
      if (selectedContact != undefined) {
        setFirstName(selectedContact.firstName);
        setLastName(selectedContact.lastName);
        setEmail(selectedContact.email);
        setPhone(selectedContact.phone);
      }
    }
  }, [dataContact]);

  const handleSubmit = () => {
    let errorMessageArr = [];
    if (firstName.trim() == '' || lastName.trim() == '') {
      if (firstName.trim() == '') {
        errorMessageArr.push({
          field: 'firstName',
          message: 'This field is required.',
        });
        setErrorMessage(errorMessageArr);
      }

      if (lastName.trim() == '') {
        errorMessageArr.push({
          field: 'lastName',
          message: 'This field is required.',
        });
        setErrorMessage(errorMessageArr);
      }
    } else {
      let dataContactArr: ContactItemProps[] = [...dataContact];
      let selectedContactIndex = dataContactArr.findIndex(
        item => item.id == itemId,
      );
      dataContactArr[selectedContactIndex].firstName = firstName;
      dataContactArr[selectedContactIndex].lastName = lastName;
      dataContactArr[selectedContactIndex].email = email;
      dataContactArr[selectedContactIndex].phone = phone;

      writeItemToStorage(dataContactArr);
      navigation.goBack();
    }
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
            field="firstName"
            value={firstName}
            onChangeText={setFirstName}
            ref={refFirstName}
            onSubmitEditing={() => refLastName.current?.focus()}
            error={errorMessage}
          />
          <View style={styles.inputSeparator} />
          <PrimaryTextInput
            label="Last Name"
            field="lastName"
            value={lastName}
            onChangeText={setLastName}
            ref={refLastName}
            onSubmitEditing={() => refEmail.current?.focus()}
            error={errorMessage}
          />
        </View>

        <Heading title="Sub Information" />
        <View style={styles.sectionContainer}>
          <PrimaryTextInput
            label="Email"
            field="email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            ref={refEmail}
            onSubmitEditing={() => refPhone.current?.focus()}
          />
          <View style={styles.inputSeparator} />
          <PrimaryTextInput
            label="Phone"
            field="phone"
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
