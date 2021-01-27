import * as types from '../actions/actionTypes';

const initialState = {
    loading: false,
    loaded: false,
    books: [],
    book: null
}

const itemReducer = (state = initialState, action) => {
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
                items: action.books
            };
        case types.GET_SINGLE_BOOK:
            return {
                ...state,
                loading: false,
                loaded: true,
                item: action.book
            };
        case types.SET_SINGLE_BOOK:
            return {
                ...state,
                loading: false,
                loaded: true,
                items: [ ...state.book, action.book ],
                item: action.book
            };
        case types.UPDATE_SINGLE_BOOK:
            console.log('initial:')
            console.log(state.books);
            let newItems = state.items.map((book, i) => {
                if (book._id === action.book._id) {
                    book = action.book;
                }
                return book;
            });
            console.log('altered:')
            console.log(newItems);
            return {
                ...state,
                loading: false,
                loaded: true,
                books: newItems,
                book: action.book
            };
        // TODO: after users are created
        // case types.FETCH_USER_ITEM:
        //   return { ...state, item: action.item }
        default:
            return state;
    }
}

export default itemReducer;
