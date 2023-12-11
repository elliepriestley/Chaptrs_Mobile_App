import React from 'react';
import { Text, TextInput, StyleSheet, View } from 'react-native';

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
      <View style={{ position: 'relative' }}>
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'white',
    borderColor: '#695203',
    borderWidth: 1,
    borderRadius: 999,
    padding: 10,
    fontFamily: 'Sansation-Regular',
  },
  errorText: {
    position: 'absolute',
    fontSize: 10,
    fontFamily: 'Sansation-Regular',
    color: 'red',
    alignSelf: 'flex-start',
    top: 40,
    left: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  label: {
    fontFamily: 'Sansation-Regular',
    fontSize: 15,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});

export default CustomInput;
