import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';

export const CustomPhoneInput = ({ label, value, onChangeText, error,onCodeChange }) => {
  const [countryCode, setCountryCode] = useState('PK');
  const [callingCode, setCallingCode] = useState('92');
  const [visible, setVisible] = useState(false);

 const onSelect = (country) => {
    setCountryCode(country.cca2);
    const newCode = country.callingCode[0];
    setCallingCode(newCode);
    // Jab code change ho, to parent (Register) ko batayein
    if (onCodeChange) {
      onCodeChange(newCode);
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <View style={[styles.inputWrapper, error && styles.errorBorder]}>
        {/* Country Picker Section */}
        <TouchableOpacity 
          style={styles.countryPickerBtn} 
          onPress={() => setVisible(true)}
        >
          <CountryPicker
            {...{
              countryCode,
              withFilter: true,
              withFlag: true,
              withEmoji: true,
              withCallingCode: true,
              onSelect,
              visible,
              onClose: () => setVisible(false),
            }}
          />
          <Text style={styles.callingCodeText}>+{callingCode}</Text>
          <Text style={styles.arrow}>▼</Text>
        </TouchableOpacity>

        {/* Vertical Line Separator */}
        <View style={styles.line} />

        {/* Number Input Section */}
        <TextInput
          style={styles.textInput}
          placeholder="300 1234567"
          keyboardType="phone-pad"
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#999"
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = ScaledSheet.create({
  container: { marginBottom: '2@ms' },
  label: { fontSize: '14@ms', color: '#333', marginBottom: '5@ms' },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: '10@ms',
    backgroundColor: '#f7f4f4',
    height: '50@ms',
    paddingHorizontal: '10@ms',
  },
  countryPickerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: '5@ms',
  },
  callingCodeText: {
    fontSize: '14@ms',
    color: '#000',
    marginLeft: '5@ms',
    fontWeight: '500',
  },
  arrow: { fontSize: '10@ms', color: '#666', marginLeft: '3@ms' },
  line: {
    width: 1,
    height: '60%',
    backgroundColor: '#ccc',
    marginHorizontal: '10@ms',
  },
  textInput: {
    flex: 1,
    fontSize: '15@ms',
    color: '#000',
    height: '100%',
  },
  errorBorder: { borderColor: 'red' },
  errorText: { color: 'red', fontSize: '12@ms', marginTop: '4@ms' },
});