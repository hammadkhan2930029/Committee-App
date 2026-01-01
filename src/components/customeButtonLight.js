import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AppColors } from '../constant/appColors';

export const CustomButtonLight = ({
  title,
  onPress,
  backgroundColor = AppColors.cardLight,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
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
