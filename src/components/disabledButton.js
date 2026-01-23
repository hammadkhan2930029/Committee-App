import React from 'react';
import { TouchableOpacity, Text, StyleSheet,View } from 'react-native';
import { AppColors } from '../constant/appColors';

export const DisabledButton = ({
  title,
  backgroundColor = AppColors.placeholder,
}) => {
  return (
    <View
      style={[styles.button, { backgroundColor }]}
     
    >
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    elevation:5
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});


