import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
  Modal,
  StyleSheet,
} from 'react-native';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { AppImages } from '../../../constant/appImages';
import { AppIcons } from '../../../constant/appIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';
import { CustomInput } from '../../../components/customTextInput';
import { CustomInputWithIcon } from '../../../components/customInputWithIcon';
import { CustomButton } from '../../../components/customButton';
import { DisabledButton } from '../../../components/disabledButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-toast-message';
import { getStoredUser } from '../../../Utils/getUser';
import { api } from '../../../services/api';

export const EditPayments = ({ route }) => {
  const navigation = useNavigation();
  const [imageUri, setImageUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userAmount, setUserAmount] = useState();
  const { payment_id } = route.params;
  console.log(payment_id);
  //-------------------------------------------------
  const options = {
    mediaType: 'photo',
    quality: 0.7,
    selectionLimit: 1,
  };
  //----------------------------------------------

  const formatNumber = value => {
    if (value === null || value === undefined) return '';

    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  //-------------------------------------------------
  const allowedTypes = ['image/jpg', 'image/png', 'image/webp'];

  const isValidImageType = asset => {
    if (!asset) return false;
    return allowedTypes.includes(asset.type);
  };
  //-------------------------------------------------
  const getFileExtension = filename =>
    filename?.split('.').pop()?.toLowerCase();

  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];

  //-------------------------------------------------
  const openGallery = () => {
    setModalVisible(false);
    launchImageLibrary(options, response => {
      if (response.didCancel) return;

      if (response.errorCode) {
        Toast.show({
          type: 'customToast',
          text1: 'Warning',
          text2: response.errorMessage,
          props: {
            bgColor: AppColors.background,
            borderColor: 'orange',
          },
        });
        return;
      }
      const asset = response?.assets?.[0];
      const ext = getFileExtension(asset.fileName);

      if (!isValidImageType(asset) && !allowedExtensions.includes(ext)) {
        Toast.show({
          type: 'customToast',
          text1: 'Invalid Format',
          text2: 'Only JPG, PNG, and WEBP images are allowed.',
          props: {
            bgColor: AppColors.background,
            borderColor: 'red',
          },
        });
        return;
      }

      setImageUri(asset.uri);
    });
  };
  console.log('image picker :', imageUri);

  //------------------------------------------------

  const editPayment = async () => {
    console.log('user amount :', userAmount);
    console.log('imageUri :', imageUri);
    console.log('payment_id', payment_id);

    try {
      var formData = new FormData();
      formData.append('amount', userAmount);
      formData.append('pay_slip', {
        uri: imageUri,
        name: 'payment-slip.jpg',
        type: 'image/jpeg',
      });

      const response = await api.post(
        `/user/edit/committee-payment/${payment_id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      );
      const result = await response.data;
      console.log('result : ', result);
      if (result.code === '200')
        Toast.show({
          type: 'customToast',
          text1: 'Success',
          text2: result?.msg?.[0]?.response || '"committee payment updated"',
          props: {
            bgColor: AppColors.background,
            borderColor: 'green',
          },
        });

      setImageUri(null);
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Toast.show({
        type: 'customToast',
        text1: 'Error',
        text2: 'Server error, please try again',
        props: {
          bgColor: AppColors.background,
          borderColor: '#ff5252',
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={AppColors.primary} barStyle="light-content" />
      <ScrollView>
        <View>
          <ImageBackground
            source={AppImages.Rectangle2}
            style={styles.RectangleImg}
          >
            <View style={styles.main}>
              <View style={styles.TopView}>
                <View style={styles.backAndText}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                      source={AppIcons.arrowBack}
                      style={styles.arrowBack}
                    />
                  </TouchableOpacity>
                  <Text style={styles.h1}>Edit Payment</Text>
                </View>
              </View>
              <View style={styles.textView}>
                <Text style={styles.h4}>
                  Review slip and update payment status.
                </Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={styles.uploadSlip}>
          {/* <View
            style={[
              styles.decView,
              { display: userAmount > 0 ? 'flex' : 'none' },
            ]}
          >
            <Text style={styles.decValue}>{userAmount - amount}</Text>
          </View> */}
          <CustomInput
            label="Amount"
            type="numeric"
            placeholder="Amount"
            value={userAmount}
            onChangeText={setUserAmount}
          />
          <View>
            <CustomInputWithIcon
              label="Choose File"
              placeholder="Choose File"
              editable={false}
              pointerEvents="none"
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
          {userAmount > 0 && imageUri ? (
            <CustomButton title="Submit Slip" onPress={() => editPayment()} />
          ) : (
            <DisabledButton title="Submit Slip" />
          )}
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

              <TouchableOpacity style={styles.optionBtn} onPress={openGallery}>
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
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </ScrollView>
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColors.background,
  },
  arrowBack: {
    width: 28,
    height: 28,
  },
  RectangleImg: {
    width: '100%',
    height: 200,
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
  activeBtn: {
    backgroundColor: AppColors.primary,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 20,
  },
  active: {
    fontSize: moderateScale(16),
    color: AppColors.title,
    textAlign: 'center',
    padding: 3,
  },
  //--------------modal---------------------
  uploadSlip: {
    backgroundColor: AppColors.background,
    width: '95%',
    padding: 10,
    elevation: 5,
    borderRadius: 15,
    alignSelf: 'center',
  },
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
    height: 160,
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
    width: '80%',
    height: 200,
    resizeMode: 'contain',
    marginTop: 10,
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
  decView: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  decValue: {
    color: 'red',
    marginBottom: -20,
    fontSize: moderateScale(14),
    padding: 5,
  },
  customBTN: {
    padding: 15,
  },
});
