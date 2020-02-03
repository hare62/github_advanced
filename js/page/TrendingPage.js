import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import actions from '../action/index';
import TrendingItem from '../common/TrendingItem';
import Toast from 'react-native-easy-toast';
import NavigationBar from '../common/NavigationBar';


const URL = 'https://github.com/trending/';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#AA2F23'

// 1.
export default class TrendingPage extends Component {

    constructor(props) {
        super(props);
        this.tabNames = ['C','C#', 'PHP', 'JavaScript'];
    }

    _genTabs() {
        const tabs = {};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`] = {
                screen: props => <TrendingTabPage {...props} tabLabel={item} />,
                navigationOptions: {
                    title: item,
                },

            };
        });
        return tabs;
    }

    render() {
        let statusBar = {
            backgroundColor:"black",
            barStyle: 'light-content',
        };

        let navigationBar = <NavigationBar
            title={'趋势'}
            statusBar={statusBar}
            // style={theme.styles.navBar}
            style={{backgroundColor:THEME_COLOR}}
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
const pageSize = 10;//设为常量，防止修改
class TrendingTab extends Component {
    constructor(props) {
        super(props);

        const { tabLabel } = this.props;
        this.storeName = tabLabel
    }

    componentDidMount() {
        this.loadData()
    }
    /**
    * 获取与当前页面有关的数据
    * @returns {*}
    * @private
    */
    _store() {
        const { trending } = this.props;
        let store = trending[this.storeName];
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
    loadData(loadMore) {
        const { onRefreshTrending, onLoadMoreTrending } = this.props;
        const store = this._store();
        const url = this.genFetchUrl(this.storeName);
        let pageIndex = ++store.pageIndex
        if (loadMore) {
            onLoadMoreTrending(this.storeName, pageIndex, pageSize, store.items, callback => {
                this.refs.toast.show('没有更多了');
            })
        } else {
          
            onRefreshTrending(this.storeName, url,pageSize)
        }

       

    }

    genFetchUrl(key) {
      
        return URL + key + '?since=daily'; 
    }

    renderItem(data) {
        const item = data.item;
        // return <View style={{ marginBottom: 10 }}>
        //     <Text style={{ backgroundColor: "#faa" }}>
        //         {JSON.stringify(item)}
        //     </Text>
        // </View>
        return <TrendingItem

            item={item}
            onSelect={() => { }}
        >

        </TrendingItem>

    }

    genIndicator() {
        return this._store().hideLoadingMore ? null :
            <View style={styles.indicatorContainer}>
                <ActivityIndicator
                    style={styles.indicator}
                />
                <Text>正在加载更多</Text>
            </View>
    }

    render() {
       
        let store = this._store();
        return (
            <View style={styles.contains}>
                <FlatList
                    data={store.projectModels}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.fullName}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={store.isLoading}
                            onRefresh={() => this.loadData()}
                            tintColor={THEME_COLOR}
                        />
                    }
                    ListFooterComponent={() => this.genIndicator()}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        // this.loadData(true);
                        console.log('---onEndReached----');
                        //为了保证onMomentumScrollBegin()首先执行
                        setTimeout(() => {
                            if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
                                this.loadData(true);
                                this.canLoadMore = false;
                            }
                        }, 100);
                    }}
                   
                    onMomentumScrollBegin={() => {
                        this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
                        console.log('---onMomentumScrollBegin-----')
                    }}
                ></FlatList>
                 <Toast ref={'toast'}
                       position={'center'}
                />
            </View>
        );
    }
}
const mapStateToProps = state => ({
    trending: state.trending
})

const mapDispatchToProps = dispatch => ({
    onRefreshTrending: (storeName, url,pageSize) => dispatch(actions.onRefreshTrending(storeName, url,pageSize)),
    onLoadMoreTrending: (storeName, pageIndex, pageSize, items, callBack) =>
        dispatch(actions.onLoadMoreTrending(storeName, pageIndex, pageSize, items, callBack))
})

const TrendingTabPage = connect(mapStateToProps, mapDispatchToProps)(TrendingTab)

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
    indicatorContainer: {
        alignItems: "center"
    },
    indicator: {
        color: 'red',
        margin: 10
    }
});