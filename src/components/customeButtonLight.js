import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppColors } from '../constant/appColors';

export const CustomButtonLight = ({
  title,
  onPress,
  backgroundColor = AppColors.cardLight,
  disabled = false,

}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: disabled ? '#BDBDBD' : backgroundColor },]}
      onPress={disabled ? null : onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
    >
      <Text style={[styles.text, { color: disabled ? '#fff' : AppColors.link }]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    elevation: 5,
  },
  text: {
    color: AppColors.link,
    fontWeight: 'bold',
  },
});
