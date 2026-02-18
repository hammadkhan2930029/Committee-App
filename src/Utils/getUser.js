import AsyncStorage from '@react-native-async-storage/async-storage';

export const getStoredUser = async () => {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.log('Error getting user:', error);
    return null;
  }
};
