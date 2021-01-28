import * as types from '../actions/actionTypes';

const initialState = {
    loading: false,
    loaded: false,
    books: [],
    book: null
}

const bookReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOADING_SINGLE_BOOK:
        case types.LOADING_ALL_BOOKS:
            return {
                ...state,
                loading: true,
                loaded: false
            };
        case types.SET_ALL_BOOKS:
            return {
                ...state,
                loading: false,
                loaded: true,
                books: action.books
            };
        case types.GET_SINGLE_BOOK:
            return {
                ...state,
                loading: false,
                loaded: true,
                book: action.book
            };
        case types.SET_SINGLE_BOOK:
            return {
                ...state,
                loading: false,
                loaded: true,
                books: [ ...state.book, action.book ],
                book: action.book
            };
        case types.UPDATE_SINGLE_BOOK:
            console.log('initial:')
            console.log(state.books);
            let newbooks = state.books.map((book, i) => {
                if (book._id === action.book._id) {
                    book = action.book;
                }
                return book;
            });
            console.log('altered:')
            console.log(newbooks);
            return {
                ...state,
                loading: false,
                loaded: true,
                books: newbooks,
                book: action.book
            };
        // TODO: after users are created
        // case types.FETCH_USER_book:
        //   return { ...state, book: action.book }
        default:
            return state;
    }
}

export default bookReducer;
