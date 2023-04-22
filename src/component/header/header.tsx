import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export type Props = {
  headerTitle: string;
  headerLeft: any;
  headerRight: any;
};

const Header: FC<Props> = Props => {
  return (
    <View style={styles.headerContainer}>
      {Props.headerLeft && (
        <View style={styles.headerLeft}>{Props.headerLeft}</View>
      )}
      <Text style={styles.headerTitle}>{Props.headerTitle}</Text>
      {Props.headerRight && (
        <View style={styles.headerRight}>{Props.headerRight}</View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#CDCDCD',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#F9F9F9',
  },
  headerLeft: {},
  headerRight: {},
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
});

export {Header};
