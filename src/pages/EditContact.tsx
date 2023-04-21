import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const EditContact = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>EditContact</Text>
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

export default EditContact;
