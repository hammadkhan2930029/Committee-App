import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../constant/appColors';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  const isPasswordField = type === 'password';
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


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
  const secureTextEntry =
    typeof rest.secureTextEntry === 'boolean'
      ? rest.secureTextEntry
      : isPasswordField
        ? !isPasswordVisible
        : settings.secureTextEntry;

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <View
        style={[
          styles.inputWrapper,
          error && styles.errorInput,
          { backgroundColor: error ? '#fde1e1' : AppColors.background },
        ]}
      >
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          keyboardType={rest.keyboardType || settings.keyboardType}
          secureTextEntry={secureTextEntry}
          autoCapitalize={rest.autoCapitalize || settings.autoCapitalize}
          style={[styles.input, style]}
          placeholderTextColor="#999"
          {...rest}
        />

        {isPasswordField && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(prev => !prev)}
            style={styles.eyeButton}
          >
            <Ionicons
              name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={AppColors.primary}
            />
          </TouchableOpacity>
        )}
      </View>

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
    color: AppColors.primary,
    fontWeight:'600'

  },
  inputWrapper: {
    minHeight: '48@ms',
    borderWidth: 0.5,
    borderColor: AppColors.primary,
    borderRadius: '10@ms',
    paddingHorizontal: '12@ms',
    backgroundColor: AppColors.background,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: '48@ms',
    fontSize: '15@ms',
    color: '#000',
    flex: 1,
    backgroundColor: 'transparent',
    paddingRight: '8@ms',
  },
  errorInput: {
    borderColor: 'red',
  },
  eyeButton: {
    paddingLeft: '8@ms',
    paddingVertical: '4@ms',
  },
  errorText: {
    marginTop: '4@ms',
    fontSize: '12@ms',
    color: 'red',
  },
});
