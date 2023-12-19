import { StyleSheet, View, TextInput } from 'react-native';
import { SearchNormal1 } from 'iconsax-react-native';
import React from 'react';

export default function SearchInput({
  value,
  onChangeText,
  onSubmitEditing,
  onPress,
  placeholder,
  ...inputProps
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
      }}
    >
      <TextInput
        style={styles.search}
        placeholder={placeholder}
        returnKeyType='search'
        placeholderTextColor='#69520377'
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        focusable={true}
        {...inputProps}
      />
      <SearchNormal1
        onPress={onPress}
        style={styles.icon}
        size={20}
        color='black'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 10,
  },
  search: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: '#695203',
    borderWidth: 1,
    borderRadius: 999,
    padding: 10,
  },
});
