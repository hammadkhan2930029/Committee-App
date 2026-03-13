import React, { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomButton } from './customButton';
import Icon from 'react-native-vector-icons/MaterialIcons';


export const DisclaimerModal = () => {
    const [modalVisible, setModalVisible] = useState(false);


    const checkModal = async () => {
        const value = await AsyncStorage.getItem('ModalClosed')
        console.log('aysnc data :', value)
        if (value === null) {
            setModalVisible(true)
        }
    }
    useEffect(() => {
        checkModal()
    }, [])
    const closedModal = async () => {
        await AsyncStorage.setItem('ModalClosed', 'true')
        setModalVisible(false)
    }
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.innerView}>
                                <View style={styles.head}>
                                    <Icon name="warning" size={26} color="#FED22D" />
                                    <Text style={styles.modalText1}>Disclaimer</Text>
                                </View>
                                <Text style={styles.modalText2}>This app does not operate as a bank, financial institution, or investment service. <Text style={styles.modalText3}>Read More</Text></Text>

                                <CustomButton title='Close' onPress={() => closedModal()} />
                            </View>
                        </View>
                    </View>

                </Modal>

            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',


    },
    modalView: {
        flex: 1,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',

    },
    innerView: {
        width: 300,
        padding: 10,
        backgroundColor: "#fff",
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    head: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,

    },
    modalText1: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600'
    },
    modalText2: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 15

    },
    modalText3: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'orange'
    },
});
