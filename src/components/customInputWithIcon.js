import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

export const CustomInputWithIcon = ({
  label,
  value,
  onChangeText,
  placeholder,
  type,
  error,

  leftIcon,
  rightIcon,
  onRightIconPress,

  containerStyle,
  inputStyle,

  ...rest
}) => {

  const getSettingsByType = () => {
    switch (type) {
      case 'email':
        return {
          keyboardType: 'email-address',
          secureTextEntry: false,
          autoCapitalize: 'none',
          editable: true,
        };
      case 'password':
        return {
          keyboardType: 'default',
          secureTextEntry: true,
          editable: true,
        };
      case 'numeric':
        return {
          keyboardType: 'numeric',
          secureTextEntry: false,
          editable: true,
        };
      case 'date':
        return {
          keyboardType: 'default',
          secureTextEntry: false,
          editable: false,   // ❗ typing off
        };
      default:
        return {
          keyboardType: 'default',
          secureTextEntry: false,
          editable: true,
        };
    }
  };

  const settings = getSettingsByType();

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        activeOpacity={type === 'date' ? 0.7 : 1}
        onPress={type === 'date' ? onRightIconPress : undefined}
      >
        <View style={[styles.inputWrapper, error && styles.errorInput]}>
          
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            editable={settings.editable}
            keyboardType={settings.keyboardType}
            secureTextEntry={settings.secureTextEntry}
            autoCapitalize={settings.autoCapitalize}
            placeholderTextColor="#999"
            style={[styles.input, inputStyle]}
            pointerEvents={type === 'date' ? 'none' : 'auto'}
            {...rest}
          />

          {rightIcon && (
            <TouchableOpacity
              onPress={onRightIconPress}
              style={styles.iconRight}
            >
              {rightIcon}
            </TouchableOpacity>
          )}

        </View>
      </TouchableOpacity>

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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: '10@ms',
    backgroundColor: '#f7f4f4ff',
    paddingHorizontal: '10@ms',
  },
  input: {
    flex: 1,
    height: '48@ms',
    fontSize: '15@ms',
    color: '#000',
  },
  iconLeft: {
    marginRight: '8@ms',
  },
  iconRight: {
    marginLeft: '8@ms',
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
