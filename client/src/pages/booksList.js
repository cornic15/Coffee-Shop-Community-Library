import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useTable } from 'react-table';
import * as actions from '../actions';
import { DeleteButton } from '../components/buttons';
import ReactTable from 'react-table-6';

import MaUTable from '@material-ui/core/Table'
import {
    CssBaseline,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';

import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;

    @media screen and (max-width: 420px) {
        padding-left: 0.5em;
        padding-right: 0.5em;
    }
`;

const Table = ({ columns, data }) => {
    const {
        getTableProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
      columns,
      data
    });

    return (
        <MaUTable {...getTableProps()}>
            <TableHead>
                {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <TableCell {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableHead>
            <TableBody>
                {rows.map((row, i) => {
                    prepareRow(row)
                    return (
                        <TableRow
                            data-row-book-id={row.values._id}
                            {...row.getRowProps()}
                        >
                            {row.cells.map(cell => {
                                return (
                                    <TableCell {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </TableCell>
                                )
                            })}
                        </TableRow>
                    )
                })}
            </TableBody>
        </MaUTable>
    )
};

class booksTable extends Component {

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
            /*
            {
                Header: 'ID',
                accessor: '_id',
                // filterable: true,
                Cell: props => {
                    console.log(props);
                    const { original } = props.cell.row;
                    return (
                        <span data-book-id={original._id}>
                            {props.value}
                        </span>
                    )
                }
            },
            */
           {
            Header: 'Image',
            accessor: 'image_url_s',
            // filterable: true,
            Cell: props => {
                const { original } = props.cell.row;
                return (
                 
                    <span data-name={original.name}>
                        <img src ={props.value} />
                    </span>
                   
                );
            }
        },
        
            {
            Header: 'Title',
            accessor: 'title',
            // filterable: true,
            Cell: props => {
                const { original } = props.cell.row;
                return (
                    <span data-name={original.name}>
                        {props.value}
                    </span>
                );
            }
        },
        {
            Header: 'Author',
            accessor: 'author',
            // filterable: true,
            Cell: props => {
                const { original } = props.cell.row;
                return (
                    <span data-name={original.name}>
                        {props.value}
                    </span>
                );
            }
        },
        {
            Header: 'Year',
            accessor: 'publication_year',
            // filterable: true,
            Cell: props => {
                const { original } = props.cell.row;
                return (
                    <span data-name={original.publication_year}>
                        {props.value}
                    </span>
                );
            }
        },

        {
            Header: 'isbn',
            accessor: 'isbn',
            // filterable: true,
            Cell: props => {
                const { original } = props.cell.row;
                return (
                    <span data-name={original.isbn}>
                        {props.value}
                    </span>
                );
            }
        },

        
        {
            Header: 'Available',
            accessor: 'available',
            // filterable: true,
            Cell: props => {
                const { original } = props.cell.row;
                return (
                    <span data-name={original.available}>
                        {props.value}
                    </span>
                );
            }
        },
/*
        {
            Header: 'test',
            accessor: 'test',
            // filterable: true,
            Cell: props => {
                const { original } = props.cell.row;
                return (
                    <button data-name={original.available} disabled = {original.available == 0}>
                        {props.value}
                    </button>
                );
            }
        },
        */
           
            /*
            {
                Header: 'Name',
                accessor: 'name',
                // filterable: true,
                Cell: props => {
                    const { original } = props.cell.row;
                    return (
                        <span data-name={original.name}>
                            {props.value}
                        </span>
                    );
                }
            },
            {
                Header: 'Day(s)',
                accessor: 'daysOfWeek',
                // filterable: true,
                Cell: props => {
                    const { daysOfWeek } = props.cell.row.original;
                    let daysToDisplay = "";
                    if (daysOfWeek && typeof daysOfWeek === "object") {
                        for (const day in daysOfWeek) {
                            daysToDisplay = daysToDisplay === "" ? daysOfWeek[day] : `${daysToDisplay}, ${daysOfWeek[day]}`;
                        }

                    }
                    return (
                        <span
                            data-daysofweek={daysOfWeek && JSON.stringify(daysOfWeek)}
                            data-daysofweek-by-id={props.value}
                        >
                            {daysToDisplay || "-"}
                        </span>
                    );
                }
            },
            {
                Header: 'Timeframe',
                accessor: 'timeframeNote',
                Cell: props => {
                    const { original } = props.cell.row;
                    return (
                        <span data-timeframe={original.timeframeNote}>
                            {props.value || "-"}
                        </span>
                    );
                },
            },
            {
                Header: 'Priority',
                accessor: 'priority',
                // filterable: true,
                Cell: props => {
                    const { original } = props.cell.row;
                    return (
                        <span data-priority={original.priority}>
                            {props.value}
                        </span>
                    );
                },
            },
            
            {
                Header: 'Update',
                accessor: '_update',
                Cell: props => {
                    const { original } = props.cell.row;
                    return (
                        <Link
                            data-update-id={original._id}
                            to={`/book/update/${props.value}`}
                        >
                            Update book
                        </Link>
                    );
                },
            },
            
           {
            Header: 'info',
            accessor: '_info',
            Cell: props => {
                return (
                    <Link
                        data-update-id={props.original._id}
                        to={`/book/info/${props.original._id}`}
                    >
                        info
                    </Link>
                );
            },
        },
        */
        {
            Header: 'Check In',
            accessor: '_checkin',
            Cell: props => {
                const { original } = props.cell.row;
                return (
                  
                    <Link to="/bookInfo" className="btn btn-primary" disabled={5===5} >Check In</Link> ); }, }, // ned to change for check in 
                       
                    
                    
            

                    {
                        Header: 'Check Out',
                        accessor: 'checkOut',
                        // filterable: true,
                        Cell: props => {
                            const { original } = props.cell.row;
                            return (
                                <button  disabled = {original.available == 0}>
                                   Check Out
                                </button>
                            );
                        }
                    },
      

        {
            Header: 'Info',
            accessor: '_info',
            Cell: props => {
                const { original } = props.cell.row;
                return (
                    <Link
                   
                        data-update-id={original._id}
                        to={`/book/info/${props.value}`} // need to change for check out
                    >
                        Info
                    </Link>
                );
            },
        },
/*
        {
            Header: '',
            accessor: '',
            Cell: props => {
                return (
                    <Link
                        data-info-id={props.original._id}
                        to={`/book/info/${props.original._id}`}
                    >
                        Update book
                    </Link>
                );
            },
        },
        */
/*

        {
            Header: 'Book Info',
            accessor: '_bookinfo',
            Cell: props => {
                const { original } = props.cell.row;
                return (
                    <Link
                   
                        data-update-id={original._id}
                        to={`/book/info/${props.value}`} // need to change for check in 
                    >
                        Info
                    </Link>
                );
            },
        },


*/

                   // <Link to="/bookInfo" className="btn btn-primary">Sign up</Link> ); }, },
/*
                    <Link
                    data-update-id={original._id}
                    to={`/book/update/${props.value}`} // need to change for more info 
                >
                    More Info
                </Link> ); }, },
*/

                   // <Link
                        
                      //  <Link to="/bookUpdate.js" >More Info
                      
                      //  </Link>
                      /*

<Link
data-update-id={original._id}
to={`/book/${props.value}`} // need to create/change to checkout
>
test

<Link>
                        to={`/book/info/${props.value}`} 
               
                      Checkout
                    </Link>
                );
            },
        },
        */
        /*
            {
                Header: 'Delete',
                accessor: '_delete',
                Cell: props => {
                    const { original } = props.cell.row;
                    return (
                        <span data-delete-id={original._id}>
                            <DeleteButton
                                id={original._id}
                                onDelete={this.handleRemovebook}
                            />
                        </span>
                    );
                },
            },
            */
        ];

        return (
            <Wrapper>
                <CssBaseline />
                {(
                    (books || []).length > 0
                ) ? (
                    <Table
                        data={books}
                        columns={columns}
                    />
                ) : (
                    `No books to render... :(`
                )}
            </Wrapper>
        );
    }

}

/*
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
*/

const mapStateToProps = state => {
    return {
      ...state
    }
}

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(booksTable);
