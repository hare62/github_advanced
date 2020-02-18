import types from '../../action/types';

const defaultState = {};

export default function onAction(state = defaultState, action) {
    switch (action.type){
        case types.FAVORITE_lOAD_SUCCESS://请求数据成功
             return {
                 ...state,
                 ...action.projectModels,
                 
             }
        default:
         return state;
    }
}
