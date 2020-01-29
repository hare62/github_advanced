import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {DrawerActions} from "react-navigation-drawer";

export default class Page5 extends React.Component {
    /**
     * this.props.navigation.openDrawer();
     * this.props.navigation.closeDrawer();
     * this.props.navigation.toggleDrawer();
     * 或者
     * this.props.navigation.dispatch(DrawerActions.openDrawer());
     * this.props.navigation.dispatch(DrawerActions.closeDrawer());
     * this.props.navigation.dispatch(DrawerActions.toggleDrawer());
     */
    render() {
        const {navigation} = this.props;
        return <View style={{flex: 1, backgroundColor: "red", paddingTop: 30}}>
            <Text style={styles.text}>欢迎来到Page5</Text>
            <Button title={'Open Drawer'} onPress={() => {
                navigation.openDrawer();
            }}/>
            <Button
                title={'Toggle Drawer'}
                onPress={() => {
                    navigation.toggleDrawer();
                }}/>
            <Button
                title={'Open Page4'}
                onPress={() => {
                    navigation.navigate('Page4');
                }}/>
        </View>
    }

}
const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        color: 'white'
    }
});