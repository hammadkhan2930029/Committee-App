import {
  StatusBar,
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  StyleSheet,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { useNavigation } from '@react-navigation/native';
import { AppIcons } from '../../../constant/appIcons';
import { AppImages } from '../../../constant/appImages';
import { CustomButton } from '../../../components/customButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';
import { CustomInputWithIcon } from '../../../components/customInputWithIcon';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const UploadSlip = () => {
  const navigation = useNavigation();
  //---------------------------
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  //------------------------------------
  const options = {
    mediaType: 'photo',
    quality: 0.7,
    selectionLimit: 1,
  };
  //------------------------------------
  const openCamera = () => {
    setModalVisible(false);
    launchCamera(options, response => {
      if (response.didCancel) return;

      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
        return;
      }

      setImageUri(response.assets[0].uri);
    });
  };
  //------------------------------------
  const openGallery = () => {
    setModalVisible(false);
    launchImageLibrary(options, response => {
      if (response.didCancel) return;

      if (response.errorCode) {
        Alert.alert('Error', response.errorMessage);
        return;
      }

      setImageUri(response.assets[0].uri);
    });
  };

  console.log('image picker :', imageUri);

  return (
    <View style={styles.conatiner}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <View>
        <ImageBackground
          source={AppImages.Rectangle}
          style={styles.RectangleImg}
        >
          <View style={styles.main}>
            <View style={styles.TopView}>
              <View style={styles.backAndText}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image source={AppIcons.arrowBack} style={styles.arrowBack} />
                </TouchableOpacity>
                <Text style={styles.h1}>Upload Payment Slip </Text>
              </View>
            </View>
            <View style={styles.textView}>
              <Text style={styles.h4}>
                Submit your payment slip for this month.
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.details}>
        <View style={styles.data}>
          <View style={styles.row}>
            <Text style={styles.label}>Amount Due</Text>
            <Text style={styles.value}>PKR 3,000</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Due Date</Text>
            <Text style={styles.value}>15 Feb 2025</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Status</Text>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Pending</Text>
            </View>
          </View>
          <View style={styles.uploadSlip}>
            <View>
              <CustomInputWithIcon
                label="Choose File"
                placeholder="Choose File"
                editable={false} // ❌ typing band
                pointerEvents="none" // ❌ focus disable
                rightIcon={<Icon name="file-upload" size={20} color="#666" />}
              />

              {/* Overlay Press Area */}
              <TouchableOpacity
                style={StyleSheet.absoluteFill}
                onPress={() => setModalVisible(true)}
                activeOpacity={0.7}
              />
            </View>
          </View>
          <View style={styles.customBTN}>
            <CustomButton title="Submit Slip" />
          </View>
          {/* ----------------------------- */}
          <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.overlay}>
              <View style={styles.modalBox}>
                <View style={styles.modalHeader}>
                  <Text style={styles.title}>Select Image</Text>
                </View>

                <TouchableOpacity style={styles.optionBtn} onPress={openCamera}>
                  <Text style={styles.optionText}>📷 Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.optionBtn}
                  onPress={openGallery}
                >
                  <Text style={styles.optionText}>🖼️ Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.cancelText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* ----------------------------- */}
          {imageUri && (
            <Image source={{ uri: imageUri }} style={styles.image} />
          )}
        </View>
      </View>
    </View>
  );
};
const styles = ScaledSheet.create({
  conatiner: {
    flex: 1,
  },
  arrowBack: {
    width: 28,
    height: 28,
  },
  RectangleImg: {
    width: '100%',
    height: '250@vs',
    resizeMode: 'contain',
  },
  TopView: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 5,
    alignSelf: 'center',
    width: '100%',
    padding: 15,
    marginTop: 20,
  },
  backAndText: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  h1: {
    fontSize: moderateScale(24),
    color: AppColors.title,
    fontWeight: '600',
    marginLeft: 10,
  },

  textView: {
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },

  h4: {
    color: AppColors.title,
    fontSize: moderateScale(16),
    opacity: 0.9,
    padding: 3,
  },
  //---------------------------------
  details: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  data: {
    width: '90%',
    padding: 10,
  },
  row: {
    justifyContent: 'space-between',
    alignItems: 'center',

    flexDirection: 'row',
    padding: 5,
    borderBottomColor: AppColors.primary,
    borderBottomWidth: 2,
  },
  label: {
    fontSize: moderateScale(17),
    color: AppColors.blackText,
    fontWeight: '600',
    padding: 3,
  },
  value: {
    color: AppColors.label,
    fontSize: moderateScale(14),
  },
  btn: {
    backgroundColor: AppColors.primary,
    width: 80,
    borderRadius: 15,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: moderateScale(14),
    color: AppColors.title,
  },
  customBTN: {
    width: '100%',
    padding: 20,
  },
  //--------------modal---------------------
  uploadBtn: {
    backgroundColor: '#1e90ff',
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: 40,
  },
  uploadText: {
    color: '#fff',
    fontWeight: '600',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    width: '80%',
    height: 200,
    borderRadius: 12,
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    textAlign: 'center',
    color: AppColors.title,
  },
  optionBtn: {
    paddingVertical: 12,
  },
  optionText: {
    fontSize: 15,
    textAlign: 'center',
  },
  cancelBtn: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#ff7e43ff',
    paddingTop: 10,
  },
  cancelText: {
    textAlign: 'center',
    color: 'red',
    fontWeight: '700',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalHeader: {
    backgroundColor: AppColors.primary,
    padding: 20,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
