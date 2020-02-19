
import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, Button, AsyncStorage,FlatList  } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import NavigationUtil from '../navigator/NavigationUtil';
import DataStore from '../expand/dao/DataStore';
import actions from '../action/index';
import { connect } from 'react-redux';
import FavoriteDao from '../expand/dao/FavoriteDao';
import {FLAG_STORAGE} from "../expand/dao/DataStore";
import FavoriteItem from '../common/FavoriteItem';
import NavigationBar from '../common/NavigationBar'
// import console = require('console');
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular)
const THEME_COLOR = '#AA2F23'
export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.tabNames = ['最热', '趋势'];
        
    }

 

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <PupolarTabPage {...props} tabLabel={item} />,
                navigationOptions: {
                    title: item,
                },

            };
        });
        return tabs;
    }

    render() {

        let statusBar = {
            backgroundColor: "black",
            barStyle: 'light-content',
                        // translucent:true,
                        // opacity:0.1
        };

        let navigationBar = <NavigationBar
            title={'收藏'}
            statusBar={statusBar}
            // style={theme.styles.navBar}
            style={{ backgroundColor: THEME_COLOR }}
        // rightButton={this.renderRightButton()}
        />;
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(),
            {
                tabBarOptions: {
                    tabStyle: styles.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: {
                        backgroundColor: '#a67',
                    },
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle,
                },
            },
        ));
        return (
            <View style={styles.container}>
                {navigationBar}
                <TabNavigator />
            </View>
        );
    }

}

class PopularTab extends Component {
    constructor(props) {
       super(props);
      this.state={
        dataSource:[],
        asyncStorageData:'初始数据',
        showText:''
      };
      this.DataStore=new DataStore();
    }

    componentDidMount(){
       const { onLoadfavoriteData } = this.props;
       onLoadfavoriteData()
       console.log("this.props",this.props)

    }

  
    renderItem(data){
        const item = data.item;
        return(
            <FavoriteItem
              projectModel={item}
            
            />
        )

    }
    _store() {
        const { favorite } = this.props;
        let store = favorite[this.storeName];
        if (!store) {
            store = {
                items: [],
                isLoading: false,
                projectModels: [],//要显示的数据
                hideLoadingMore: true,//默认隐藏加载更多
            }
        }
        return store;
    }
   
    render() {

        const { favorite } = this.props;
    
        return (
            <View>
                <Text>PopularTab</Text>
                <FlatList
                    data={favorite}
                    renderItem={data => this.renderItem(data)}
                   
                ></FlatList>
            </View>
        );
    }
}


const mapStateToProps = state => ({
    favorite: state.favorite
})

const mapDispatchToProps = dispatch => ({
    onLoadfavoriteData: () => dispatch(actions.onLoadfavoriteData())
})

const PupolarTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    tabStyle: {
        minWidth: 50,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white',
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6,
    },
});