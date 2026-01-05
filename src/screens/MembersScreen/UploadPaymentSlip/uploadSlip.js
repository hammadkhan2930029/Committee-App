import {
  StatusBar,
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { AppColors } from '../../../constant/appColors';
import { useNavigation } from '@react-navigation/native';
import { AppIcons } from '../../../constant/appIcons';
import { AppImages } from '../../../constant/appImages';

export const UploadSlip = () => {
  const navigation = useNavigation();
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
                <Text style={styles.h1}>Committee Details</Text>
              </View>
            </View>
            <View style={styles.textView}>
              <Text style={styles.h4}>ABC Group BC</Text>
              <View style={styles.activeBtn}>
                <Text style={styles.active}>Active</Text>
              </View>
            </View>
          </View>
        </ImageBackground>
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
      fontSize: moderateScale(20),
      padding: 5,
    },
});
