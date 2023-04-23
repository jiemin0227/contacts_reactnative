import React, {FC, ForwardedRef, forwardRef, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type ErrorMessageProps = {
  field: string;
  message: string;
};

export type Props = {
  label: string;
  field: string;
  onChangeText: any;
  value: any;
  keyboardType?: any;
  onSubmitEditing?: any;
  error?: ErrorMessageProps[];
};

const PrimaryTextInput = forwardRef<TextInput, Props>((Props, ref) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.textInputLabel}>{Props.label}</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.textInput}
          onChangeText={Props.onChangeText}
          value={Props.value}
          keyboardType={Props.keyboardType}
          returnKeyType="next"
          ref={ref}
          onSubmitEditing={Props.onSubmitEditing}
        />
        {Props.error != undefined &&
          Props.error.length > 0 &&
          Props.error.map(
            item =>
              item.field == Props.field && (
                <Text style={styles.inputError}>{item.message}</Text>
              ),
          )}
      </View>
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
  inputWrapper: {
    flex: 0.7,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#D1D0D1',

    paddingVertical: 3,
  },
  inputError: {
    color: 'red',
  },
});

export {PrimaryTextInput};
