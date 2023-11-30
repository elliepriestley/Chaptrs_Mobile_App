import React from 'react';
import { Text, TextInput, StyleSheet } from 'react-native';

const CustomInput = (props) => {
  const {
    field: { name, onBlur, onChange, value },
    form: { errors, touched, setFieldTouched },
    label,
    ...inputProps
  } = props;

  const hasError = errors[name] && touched[name];

  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.textInput, hasError && styles.errorInput]}
        value={value}
        onChangeText={(text) => onChange(name)(text)}
        onBlur={() => {
          setFieldTouched(name);
          onBlur(name);
        }}
        {...inputProps}
      />
      {hasError && <Text style={styles.errorText}>{errors[name]}</Text>}
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: '100%',
    marginVertical: 10,
    backgroundColor: 'white',
    borderColor: '#695203',
    borderWidth: 1,
    borderRadius: 999,
    padding: 10,
  },
  errorText: {
    fontSize: 10,
    color: 'red',
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  errorInput: {
    borderColor: 'red',
  },
  label: {
    fontSize: 15,
    alignSelf: 'flex-start',
  },
});

export default CustomInput;
