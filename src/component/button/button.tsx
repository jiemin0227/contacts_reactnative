import React, {FC} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

export type Props = {
  icon: any;
  title: string;
  onPress: any;
};

const Button: FC<Props> = Props => {
  return (
    <TouchableOpacity style={styles.container} onPress={Props.onPress}>
      {Props.icon}
      {Props.title && <Text style={styles.textTitle}>{Props.title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  textTitle: {
    fontSize: 20,
    color: '#ff8c00',
  },
});

export {Button};
