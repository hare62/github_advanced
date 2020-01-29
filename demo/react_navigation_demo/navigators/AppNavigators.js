import React from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import {SafeAreaView} from 'react-navigation'
import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs'
import Page1 from '../pages/Page1';
import Page2 from '../pages/Page2';
import Page4 from '../pages/Page4';
import Page5 from '../pages/Page5';
import Page3 from '../pages/Page3';
import HomePage from '../pages/HomePage';
import {Button, Text, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {createDrawerNavigator, DrawerNavigatorItems} from 'react-navigation-drawer'
import SwitchNavigator from './SwitchNavigator'

const DrawerNav = createDrawerNavigator(
    {
        Page4: {
            screen: Page4,
            navigationOptions: {
                drawerLabel: 'Page4',
                drawerIcon: ({tintColor, focused}) => (
                    <MaterialIcons name={'drafts'}
                                   size={24}
                                   style={{color: tintColor}}
                    />
                )
            }
        },
        Page5: {
            screen: Page5,
            navigationOptions: {
                drawerLabel: 'Page5',
                drawerIcon: ({tintColor, focused}) => (
                    <MaterialIcons
                        name="move-to-inbox"
                        size={24}
                        style={{color: tintColor}}
                    />
                )
            }
        }
    },
    {
        contentComponent: (props) => (//自定义侧拉抽屉
            <ScrollView style={{backgroundColor: '#098', flex: 1}}>
                <SafeAreaView forceInset={{top: "always"}}>
                    <DrawerNavigatorItems {...props}/>
                </SafeAreaView>
            </ScrollView>
        ),
        contentOptions: {
            activeTintColor: 'white'
        }
    }
);

const MaterialTopTabNavigator = createMaterialTopTabNavigator(
    {//在这里配置页面的路由
        Page1: {
            screen: Page1,
            navigationOptions: {
                tabBarLabel: 'Page1',

            }
        },
        Page2: {
            screen: Page2,
            navigationOptions: {
                tabBarLabel: ({tintColor, focused}) => (//自定义Tab文字
                    <Text style={{color: focused ? 'orange' : 'grey'}}>Page2</Text>
                ),
            }
        },
        Page3: {
            screen: Page3,
            navigationOptions: {
                tabBarLabel: 'Page3',
            }
        },

    },
    {
        tabBarOptions: {
            // activeTintColor: 'red'
            tabStyle: {//tab
                minWidth: 50
            },
            upperCaseLabel: false,//是否使标签大写，默认为true,
            style: {
                backgroundColor: '#879'
            },
            indicatorStyle: {//指示器样式
                height: 2,
                backgroundColor: 'white'
            },
            labelStyle: {//文字的样式
                fontSize: 13,
                marginTop: 6,
                marginBottom: 6
            }
        }
    }
);


const BottomTabNavigator = createBottomTabNavigator(
    {//在这里配置页面的路由
        Page1: {
            screen: Page1,
            navigationOptions: {
                tabBarLabel: 'Page1',
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={'ios-home'}
                        size={26}
                        style={{color: tintColor}}
                    />
                )
            }
        },
        Page2: {
            screen: Page2,
            navigationOptions: {
                tabBarLabel: ({tintColor, focused}) => (//自定义Tab文字
                    <Text style={{color: focused ? 'orange' : 'grey',textAlign: 'center'}}>Page2</Text>
                ),
                tabBarIcon: ({tintColor, focused}) => (
                    <Ionicons
                        name={'ios-people'}
                        size={26}
                        style={{color: focused ? 'orange' : 'grey'}}
                    />
                )
            }
        }

    },
    {
        tabBarOptions: {
            activeTintColor: 'red'
        }
    }
);


export const AppStackNavigator = createStackNavigator(
    {
        HomePage: {
            screen: HomePage,
        },
        DrawerNav: DrawerNav,
        SwitchNav: SwitchNavigator,
        MaterialTopTabNavigator: {
            screen: MaterialTopTabNavigator,
            navigationOptions: {
                title: '顶部导航器'
            }
        },
        BottomTabNavigator: {
            screen: BottomTabNavigator,
            navigationOptions: {
                title: '底部导航器',
                header: null
            }
        },
        Page1: {
            screen: Page1,
            navigationOptions: ({navigation}) => (
                {
                    title: `${navigation.state.params && navigation.state.params.name}页面名`//动态设置navigationOptions
                }
            )
        },
        Page2: {
            screen: Page2,
            navigationOptions: {
                title: "Page2",
                // header:null
            }
        },
        Page3: {
            screen: Page3,
            navigationOptions: (props) => {
                const {navigation} = props;
                const {state, setParams} = navigation;
                const {params = {}} = state;
                return {
                    title: params.name ? params.name : "This is Page3",
                    headerRight: (
                        <Button
                            title={params.mode === 'edit' ? '保存' : "编辑"}
                            onPress={() => {
                                setParams({mode: params.mode === 'edit' ? "" : 'edit'})
                            }}
                        />
                    )
                }
            }
        },

    },
    {
        defaultNavigationOptions: {//全局默认属性，对当前导航器的所有页面有效
            // header: null //可以通过将header设为null 来禁用StackNavigator的Navigation Bar
        }
    }
);