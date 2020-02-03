
/**
 * 处理数据
 * @param actionType
 * @param dispatch
 * @param storeName
 * @param data
 * @param pageSize
 * @param favoriteDao
 * @param params 其他参数
 */

export function handleData(actionType, dispatch, storeName, data, pageSize) {
    let fixItems = [];
    if (data && data.data) {
        if (Array.isArray(data.data)) {
            fixItems = data.data;
        } else if (Array.isArray(data.data.items)) {
            fixItems = data.data.items;
        }
    }
    dispatch({
        type: actionType,
        items: fixItems,
        projectModels: pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize),//第一次加载的数据是0-10，第二次加载的数据是0-20，第三次加载的数据是0-30
        storeName: storeName,
        pageIndex: 1
    })
}