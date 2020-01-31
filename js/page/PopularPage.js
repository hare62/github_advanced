import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import actions from '../action/index';
import PopularItem from '../common/PopularItem'


const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = 'red'

// 1.
export default class PopularPage extends Component {

    constructor(props) {
        super(props);
        this.tabNames = ['All', 'Android', 'Java', 'React', 'React Native', 'PHP'];
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
        console.log("tabs",tabs)
        return tabs;
    }

    render() {
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
                <TabNavigator />
            </View>
        );
    }

}

class PopularTab extends Component {
    constructor(props) {
        super(props);

        const { tabLabel } = this.props;
        console.log('tabLabel', this.props)
        this.storeName = tabLabel
    }

    componentDidMount() {
        this.loadData()
    }
    loadData() {
        const { onLoadPopularData } = this.props;
        const url = this.genFetchUrl(this.storeName);

        onLoadPopularData(this.storeName, url)

    }

    genFetchUrl(key) {
        console.log(URL + key + QUERY_STR)
        return URL + key + QUERY_STR;
    }

    renderItem(data) {
        const item = data.item;
        // return <View style={{ marginBottom: 10 }}>
        //     <Text style={{ backgroundColor: "#faa" }}>
        //         {JSON.stringify(item)}
        //     </Text>
        // </View>
        return <PopularItem 
        
            item={item}
            onSelect={()=>{}}
        >
               
        </PopularItem>

    }

    render() {
        const { popular } = this.props;
        let store = popular[this.storeName];//动态获取state
        if (!store) {//如果store 是空的话
            store = {
                items: [],
                isLoading: false
            }
        }
        return (
            <View style={styles.contains}>
                <FlatList
                    data={store.items}
                    renderItem={data => this.renderItem(data)}
                    keyExtractor={item => "" + item.id}
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
                ></FlatList>
            </View>
        );
    }
}
const mapStateToProps = state => ({
    popular: state.popular
})

const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName, url))
})

const PupolarTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)

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
});