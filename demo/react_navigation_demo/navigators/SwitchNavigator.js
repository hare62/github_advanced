import {createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import HomePage from '../pages/HomePage'
import Page1 from '../pages/Page1'
import Login from '../pages/Login'

const AppStack = createStackNavigator(
    {
        Home: {
            screen: HomePage
        },
        Page1: {
            screen: Page1
        }
    }
);
const AuthStack = createStackNavigator(
    {
        Login: {
            screen: Login
        }
    }
);
export default createSwitchNavigator(
    {
        Auth: {
            screen: AuthStack
        },
        App: AppStack
    }
)