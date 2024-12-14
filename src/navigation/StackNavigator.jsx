import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";

import RegistrationScreen from '../Screens/RegistrationScreen.jsx';
import LoginScreen from '../Screens/LoginScreen.jsx';
import BottomTabNavigator from './BottomTabNavigator.jsx';

import useAuth from "../hooks/useAuth";

const MainStack = createStackNavigator();

const StackNavigator = () => {
    const { isLoggedIn } = useAuth();
    
    return (
        <MainStack.Navigator
            initialRouteName="Registration"
            screenOptions={{
                headerShown: false,
            }}
        >
            {isLoggedIn ? (
                <>
                    <MainStack.Screen name="Home" component={BottomTabNavigator} />
                </>
            ) : (
                <>
                    <MainStack.Screen
                        name="Registration"
                        component={RegistrationScreen}
                        options={{
                            headerShown: false,
                            tabBarStyle: { display: "none" },
                            tabBarItemStyle: { display: "none" }
                        }}
                    />
                    <MainStack.Screen
                        name="Login"
                        component={LoginScreen}
                        options={{
                            headerShown: false,
                            tabBarStyle: { display: "none" },
                            tabBarItemStyle: { display: "none" }
                        }}
                    />
                </>
            )}
        </MainStack.Navigator>
    );
};

export default StackNavigator;