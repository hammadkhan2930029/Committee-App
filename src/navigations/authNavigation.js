import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from '../screens/Auth/Login/login';
import { Splash } from '../screens/splash/splash';
import { Register } from '../screens/Auth/Register/register';
import { ForgetPassword } from '../screens/Auth/ForgetPassword/ForgetPassword';
import { ChangePassword } from '../screens/Auth/ChangePassword/changePassword';
import { OtpVerification } from '../screens/Auth/OTP/otp';
import { ResetPassword } from '../screens/Auth/ResetPassword/ResetPassword';


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
      <Auth.Screen name="ForgetPassword" component={ForgetPassword} />
      <Auth.Screen name="ChangePassword" component={ChangePassword} />
      <Auth.Screen name="ResetPassword" component={ResetPassword} />

    </Auth.Navigator>
  );
};
