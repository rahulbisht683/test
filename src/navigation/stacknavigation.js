import {createStackNavigator} from '@react-navigation/stack';

import Home from '../screens/Home';
import CreateProfile from '../screens/Createeditprofile/CreateProfile';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default StackNavigation;
