import Types from '../types';
import DataStore from '../../expand/dao/DataStore';

/**
 * 获取最热数据的异步action
 * @param {} storeName 
 * @param {} url
 * @returns {function name(params) {
     
 }}
 */

export function onLoadPopularData(storeName, url) {
    return dispatch =>{
        dispatch({type:Types.POPULAR_REFRESH, storeName:storeName})
        let dataStore = new DataStore()
        dataStore.fetchData(url).then(data=>{
            console.log('data',data)
            handleData(dispatch, storeName, data);
        }).catch(error => {
            console.log(error);
            dispatch({
                type:Types.POPULAR_lOAD_FAIL, 
                storeName:storeName,
                error:error})
        })
    }

}

function handleData(dispatch, storeName, data){
    dispatch({
        type:Types.POPULAR_lOAD_SUCCESS,
        items:data && data.data && data.data.items,
        storeName:storeName
    })
}