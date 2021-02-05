import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactTable from 'react-table-6';
import * as actions from '../actions';
import { DeleteButton } from '../components/buttons';

import styled from 'styled-components';

import 'react-table-6/react-table.css';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`;

class booksList extends Component {

    componentDidMount() {
        console.log("booksList: props");
        console.log(this.props);
        // if (((this.props.bookData || {}).books || []).length) return;

        this.props.fetchAllBooks()
    }

    handleRemovebook = data => {
        const bookId = data;

        this.props.deleteSinglebook(bookId)
            .then(resp => {
                console.log("handleRemovebook: resp");
                console.log(resp);
                this.props.fetchAllBooks();
            });
    }

    render() {
        const {
            books,
            loaded,
            loading
        } = this.props.bookData || {};
        console.log(books);

        const columns = [
            {
                Header: 'ISBN',
                accessor: 'isbn',
                filterable: true,
                Cell: props => {
                    return (
                        <span data-book-id={props.original.isbn}>
                            {props.original.isbn}
                        </span>
                    )
                }
            },
            {
                Header: 'Title',
                accessor: 'title',
                filterable: true,
                Cell: props => {
                    return (
                        <span data-name={props.original.title}>
                            {props.value}
                        </span>
                    );
                }
            },
            {
            Header: 'Author',
            accessor: 'author',
            filterable: true,
            Cell: props => {
                return (
                    <span data-name={props.original.author}>
                        {props.value}
                    </span>
                );
            }
        },

        {
            Header: 'Copies',
            accessor: 'copies',
            filterable: true,
            Cell: props => {
                return (
                    <span data-name={props.original.copies}>
                        {props.value}
                    </span>
                );
            }
        },

            {
                Header: '',
                accessor: '',
                Cell: props => {
                    return (
                        <Link
                            data-update-id={props.original._id}
                            to={`/book/update/${props.original._id}`}
                        >
                            Update book
                        </Link>
                    );
                },
            },
            {
                Header: '',
                accessor: '',
                Cell: props => {
                    return (
                        <span data-delete-id={props.original._id}>
                            <DeleteButton
                                id={props.original._id}
                                onDelete={this.handleRemovebook}
                            />
                        </span>
                    );
                },
            },
        ];

        return (
            <Wrapper>
                {(
                    (books || []).length > 0 // defeats the purpose of using `isLoading` prop?
                ) ? (
                        <ReactTable
                            data={books}
                            columns={columns}
                            isLoading={(loaded && loading)}
                            defaultPageSize={10}
                            showPageSizeOptions={true}
                            minRows={10}
                        />
                    ) : (
                        `No books to render... :(`
                    )}
            </Wrapper>
        );
    }

}

const mapStateToProps = state => {
    return {
      ...state
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(booksList);
