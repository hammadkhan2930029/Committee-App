import AsyncStorage from '@react-native-async-storage/async-storage';

const ROLE_KEY = 'CURRENT_ROLE';

export const saveCurrentRole = async role => {
  await AsyncStorage.setItem(ROLE_KEY, role);
};

export const getCurrentRole = async () => {
  return await AsyncStorage.getItem(ROLE_KEY);
};

export const removeCurrentRole = async () => {
  await AsyncStorage.removeItem(ROLE_KEY);
};