import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, FlatList } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createAppContainer } from 'react-navigation';
import FavoriteDao from '../expand/dao/FavoriteDao';
import { FLAG_STORAGE } from "../expand/dao/DataStore";
import actions from '../action';
import { connect } from 'react-redux';
// import console = require('console');
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
class FavoritePage extends Component {
    constructor(props) {
        super(props);
        this.tabName = ["最热", "收藏"];
        this.favoriteData = ''
    }

    async componentDidMount() {
        await favoriteDao.getAllItems().then((item) => {
           
            this.favoriteData = item
        })
        console.log('favoriteData', this.favoriteData)


    }

    _genTabs() {
        const tabs = {};
        this.tabName.forEach((item, index) => { 
            tabs[`tab${index}`] = {
                screen: props => <FavoriteTobPage {...props} />,
                navigationOptions: {
                    title: item
                }
            }
        });
        return tabs;                                        
    }                                            .

        )
    }

    render() {
        let contains = [
            { title: "javaScript", contain: "javaScriptcontain-javaScriptcontain-javaScriptcontain", author: "hare" },
        ]
        let hare = [{ key: 'a' }, { key: 'b' }]


        return (
            <View>
                <FlatList
                    data={contains}
                    renderItem={data => this.renderItem(data)}
                />
            </View>

        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',//会导致createMaterialTopTabNavigator闪屏
        backgroundColor: '#F5FCFF',
    },
    tabStyle: {
        // minWidth: 50 ,//fix minWidth会导致tabStyle初次加载时闪烁
        padding: 0,
        height: 30,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
    },
    containList: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6,
    },
    title: {
        fontSize: 16,
        marginBottom: 3,
        color: 'red',
    },
    contain: {
        marginBottom: 10,
        marginTop: 10,
        color: '#757575',

    },
    containlist: {
        fontSize: 16,
        marginBottom: 3,
        color: '#212121',
        marginTop: 0,
    },
    cell_container: {
        backgroundColor: 'white',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        marginVertical: 3,
        borderColor: '#dddddd',
        borderWidth: 0.5,
        borderRadius: 2,
        shadowColor: 'gray',
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.4,
        shadowRadius: 1,
        elevation: 2
    },
});


const mapDispatchToProps = dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});
export default connect(null, mapDispatchToProps)(FavoritePage);