import * as types from './actionTypes';
import api from '../api';

// TODO - make a utility for logging?

export const fetchAllBooks = () => {
    return (dispatch) => {
        dispatch({ type: types.LOADING_ALL_BOOKS });

        return api.getAllBooks()
            .then(resp => {
                const { books } = resp.data;
                console.log("getAllBooks: resp");
                console.log(books);
                console.log(resp.data)
                dispatch({
                    type: types.SET_ALL_BOOKS,
                    books,
                });
            })
            .catch(err => {
                console.error(`ERROR in 'getAllBooks': ${err}`);
                console.error(err);
                return err;
            });
    };
};

export const fetchSingleBook = (bookId) => {
    return (dispatch) => {
        dispatch({ type: types.LOADING_SINGLE_BOOK });

        return api.getBookById(bookId)
            .then(resp => {
                console.log("getBookById: resp");
                console.log(resp);
                if (resp.data.success) {
                    const { book } = resp.data;
                    dispatch({
                        type: types.GET_SINGLE_BOOK,
                        book,
                    });
                }
                return resp;
            })
            .catch(err => {
                console.error(`ERROR in 'fetchSinglebook': ${err}`);
                console.error(err);
                return err;
            });
    };
};

export const insertSingleBook = book => {
    return () => {
       // dispatch({ type: types.LOADING_SINGLE_BOOK });

        return api.insertBook(book)
            .then(resp => {
                console.log("insertbook: resp");
                console.log(resp);
                if ((resp.data || {}).success) {
                    const newbook = resp.data;
               
                    console.log (newbook.id);
                    /*
                    dispatch({
                        type: types.SET_SINGLE_BOOK,
                        book: {
                            _id: resp.data.id,
                            ...newbook
                        }
                    });
                    */
                }
                return resp;
            })
            .catch(err => {
                console.error(`ERROR in 'insertSingleBook': ${err}`);
                console.error(err);
                return err;
            });
    };
};

export const updateSingleBook = book => {
    alert("updateSingleBook: "+book._id);
    return (dispatch) => {
        dispatch({ type: types.LOADING_SINGLE_BOOK });

        return api.updateBookById(book._id, book)
            .then(resp => {
                console.log("updatebook: resp");
                console.log(resp);
                if ((resp.data || {}).success) {
                    const newbook = JSON.parse(resp.config.data);
                    dispatch({
                        type: types.UPDATE_SINGLE_BOOK,
                        book: {
                            _id: resp.data.id,
                            ...newbook
                        }
                    });
                }
                return resp;
            })
            .catch(err => {
                console.error(`ERROR in 'updateSinglebook': ${err}`);
                console.error(err);
                return err;
            });
    };
};

export const deleteSinglebook = bookId => {
    return (dispatch) => {
        dispatch({ type: types.LOADING_SINGLE_BOOK });

        return api.deleteBookById(bookId)
            .then(resp => {
                console.log("deleteBookById: resp");
                console.log(resp);
                dispatch({
                    type: types.RELOAD_BOOKS
                });
                return resp;
            })
            .catch(err => {
                console.error(`ERROR in 'deleteSinglebook': ${err}`);
                console.error(err);
                return err;
            });
    };
};
