import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ContactList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>ContactList</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 16,
  },
});

export default ContactList;
