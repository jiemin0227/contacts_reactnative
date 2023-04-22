import React, {FC, ForwardedRef, forwardRef, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export type Props = {
  label: string;
  onChangeText: any;
  value: any;
  keyboardType: any;
  onSubmitEditing: any;
};

const PrimaryTextInput: FC<Props> = forwardRef<null, Props>((Props, ref) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.textInputLabel}>{Props.label}</Text>
      <TextInput
        style={styles.textInput}
        onChangeText={Props.onChangeText}
        value={Props.value}
        keyboardType={Props.keyboardType}
        returnKeyType="next"
        ref={ref}
        onSubmitEditing={Props.onSubmitEditing}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingVertical: 10,
    flex: 1,
  },
  textInputLabel: {
    marginRight: 'auto',
    flex: 0.3,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#D1D0D1',
    flex: 0.7,
    paddingVertical: 3,
  },
});

export {PrimaryTextInput};
