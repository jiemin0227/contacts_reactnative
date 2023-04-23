import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Icon from 'react-native-vector-icons/Ionicons';

import {Header} from '../component/header';
import {Button} from '../component/button';
import {readItemFromStorage, writeItemToStorage} from '../storage/asyncStorage';
import {useFocusEffect} from '@react-navigation/native';
import data from '../data/data.json';
import {NavigationProps} from '../../App';

export type ContactItemProps = {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
};

const ContactList = ({navigation}: NavigationProps) => {
  const [dataContact, setDataContact] = useState<ContactItemProps[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setDataContact(data);
    writeItemToStorage(data);
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      readItemFromStorage(setDataContact);
    }, []),
  );

  const ItemSeparatorComponent = () => (
    <View style={styles.flatListItemSeparator} />
  );
  const Item = (item: ContactItemProps) => (
    <TouchableOpacity
      style={styles.flatListItem}
      onPress={() =>
        navigation.navigate('EditContact', {
          itemId: item.id,
        })
      }>
      <View style={styles.column1}>
        <View style={styles.flatListItemImageAvatar} />
      </View>

      <View style={styles.column2}>
        <Text
          style={
            styles.flatListItemTextName
          }>{`${item.firstName} ${item.lastName}`}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Header
        headerTitle="Contacts"
        headerLeft={
          <Button
            icon={<Icon name="search-outline" color="#ff8c00" size={20} />}
            onPress={() => console.log('search')}
          />
        }
        headerRight={
          <Button
            icon={<Icon name="add-outline" color="#ff8c00" size={20} />}
            onPress={() => console.log('add')}
          />
        }
      />
      <FlatList
        data={dataContact}
        renderItem={({item}) => <Item {...item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={ItemSeparatorComponent}
        style={styles.flatListContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
  flatListItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  column1: {
    flex: 0.2,
    marginRight: 10,
  },
  column2: {
    flex: 0.8,
  },
  flatListItemImageAvatar: {
    aspectRatio: 1,
    borderRadius: 50,
    overflow: 'hidden',
    backgroundColor: '#ff8c00',
  },
  flatListItemTextName: {
    borderRadius: 50 / 2,
    overflow: 'hidden',
  },

  flatListItemSeparator: {
    borderBottomWidth: 1,
    borderBottomColor: '#CDCDCD',
  },
});

export default ContactList;
