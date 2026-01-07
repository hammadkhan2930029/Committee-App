import React from 'react';
import { StyleSheet, View, Text, Modal } from 'react-native';
import AnimatedLoader from 'react-native-animated-loader';

export const Loader = ({ visible }) => {
  return (
    <Modal transparent={true} animationType="fade" visible={visible}>
      <View style={styles.container}>
        <AnimatedLoader
          visible={visible}
          overlayColor="rgba(0,0,0,0.5)"
          animationStyle={styles.lottie}
          speed={1}
        >
          <Text style={{color:'#fff', marginTop:10}}>Loading...</Text>
        </AnimatedLoader>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  lottie: {
    width: 100,
    height: 100,
  },
});
