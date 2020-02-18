import Types from '../types';
import FavoriteDao from '../../expand/dao/FavoriteDao';
import {FLAG_STORAGE} from "../../expand/dao/DataStore";

export function onLoadfavoriteData() {
    return dispatch => {

        const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);

        favoriteDao.getAllItems().then((data)=>{
             dispatch({
                type: Types.FAVORITE_lOAD_SUCCESS,
                projectModels:data
               
             })
        })
       
    }

}