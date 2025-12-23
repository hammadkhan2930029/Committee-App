import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/Auth/Login/login';
import { Splash } from '../screens/splash/splash';
import { Register } from '../screens/Auth/Register/register';
import { OtpVerification } from '../screens/Auth/OTP/otp';
import { ResetPassword } from '../screens/Auth/ResetPassword/resetPassword';
import { ChangePassword } from '../screens/Auth/ChangePassword/changePassword';


const Auth = createNativeStackNavigator();


export const AuthNavigator = () => {


  return (
    <Auth.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false }}
    >
      <Auth.Screen name="Splash" component={Splash} />
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="Register" component={Register} />
      <Auth.Screen name="Otp" component={OtpVerification} />
      <Auth.Screen name="ResetPassword" component={ResetPassword} />
      <Auth.Screen name="ChangePassword" component={ChangePassword} />
    </Auth.Navigator>
  );
};
