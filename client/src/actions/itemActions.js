import * as types from './actionTypes';
import api from '../api';

// TODO - make a utility for logging?

export const fetchAllBooks = () => {
    return (dispatch) => {
        dispatch({ type: types.LOADING_ALL_BOOKS });

        return api.getAllBooks()
            .then(resp => {
                const { items } = resp.data;
                console.log("getAllItems: resp");
                console.log(items);
                dispatch({
                    type: types.SET_ALL_BOOKS,
                    items,
                });
            })
            .catch(err => {
                console.error(`ERROR in 'getAllItems': ${err}`);
                console.error(err);
                return err;
            });
    };
};

export const fetchSingleBook = (itemId) => {
    return (dispatch) => {
        dispatch({ type: types.LOADING_SINGLE_BOOK });

        return api.getBookById(itemId)
            .then(resp => {
                console.log("getItemById: resp");
                console.log(resp);
                if (resp.data.success) {
                    const { item } = resp.data;
                    dispatch({
                        type: types.GET_SINGLE_BOOK,
                        item,
                    });
                }
                return resp;
            })
            .catch(err => {
                console.error(`ERROR in 'fetchSingleItem': ${err}`);
                console.error(err);
                return err;
            });
    };
};

export const insertSingleBook = item => {
    return (dispatch) => {
        dispatch({ type: types.LOADING_SINGLE_BOOK });

        return api.insertItem(item)
            .then(resp => {
                console.log("insertItem: resp");
                console.log(resp);
                if ((resp.data || {}).success) {
                    const newItem = JSON.parse(resp.config.data);
                    dispatch({
                        type: types.SET_SINGLE_BOOK,
                        item: {
                            _id: resp.data.id,
                            ...newItem
                        }
                    });
                }
                return resp;
            })
            .catch(err => {
                console.error(`ERROR in 'insertSingleItem': ${err}`);
                console.error(err);
                return err;
            });
    };
};

export const updateSingleBook = item => {
    return (dispatch) => {
        dispatch({ type: types.LOADING_SINGLE_BOOK });

        return api.updateItemById(item._id, item)
            .then(resp => {
                console.log("updateItem: resp");
                console.log(resp);
                if ((resp.data || {}).success) {
                    const newItem = JSON.parse(resp.config.data);
                    dispatch({
                        type: types.UPDATE_SINGLE_BOOK,
                        item: {
                            _id: resp.data.id,
                            ...newItem
                        }
                    });
                }
                return resp;
            })
            .catch(err => {
                console.error(`ERROR in 'updateSingleItem': ${err}`);
                console.error(err);
                return err;
            });
    };
};

export const deleteSingleItem = itemId => {
    return (dispatch) => {
        dispatch({ type: types.LOADING_SINGLE_BOOK });

        return api.deleteItemById(itemId)
            .then(resp => {
                console.log("deleteItemById: resp");
                console.log(resp);
                dispatch({
                    type: types.RELOAD_BOOKS
                });
                return resp;
            })
            .catch(err => {
                console.error(`ERROR in 'deleteSingleItem': ${err}`);
                console.error(err);
                return err;
            });
    };
};
