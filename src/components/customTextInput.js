import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';

export const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  type,
  error,
  style,
  ...rest 
}) => {
  
  
  const getSettingsByType = () => {
    switch (type) {
      case 'email':
        return { keyboardType: 'email-address', secureTextEntry: false, autoCapitalize: 'none' };
      case 'password':
        return { keyboardType: 'default', secureTextEntry: true };
      case 'numeric':
        return { keyboardType: 'numeric', secureTextEntry: false };
      default:
        return { keyboardType: 'default', secureTextEntry: false };
    }
  };

  const settings = getSettingsByType();

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={rest.keyboardType || settings.keyboardType}
        secureTextEntry={rest.secureTextEntry || settings.secureTextEntry}
        autoCapitalize={rest.autoCapitalize || settings.autoCapitalize}
        style={[styles.input, style, error && styles.errorInput]}
        placeholderTextColor="#999"
        {...rest} 
      />

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    marginVertical: '8@ms',
  },
  label: {
    marginBottom: '5@ms',
    fontSize: '14@ms',
    color: '#333',
  },
  input: {
    height: '48@ms',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: '10@ms',
    paddingHorizontal: '12@ms',
    fontSize: '15@ms',
    backgroundColor: '#f7f4f4ff',
    color: '#000',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    marginTop: '4@ms',
    fontSize: '12@ms',
    color: 'red',
  },
});