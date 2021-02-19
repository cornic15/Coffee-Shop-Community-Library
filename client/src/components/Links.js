import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Logo from './Logo';

const HomeWrapper = styled.div``;

const Collapse = styled.div.attrs({
    // className: 'collapse navbar-collapse',
})`
    @media screen and (max-width: 420px) {
        display: flex;
        flex-grow: 1;
    }
`;

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})`
    @media screen and (max-width: 420px) {
        flex-direction: row;
        justify-content: space-between;
        /* justify-content: flex-start; */
        width: 100%;
    }
`;

const Book = styled.div.attrs({
    // className: 'collapse navbar-collapse',
})`
    @media screen and (max-width: 420px) {
        /* margin-right: 2em; */
    }
`;

const homeStyles = {
    marginLeft: `1em`
};

const logoStyles = {
    height: '40px',
    width: '40px',
};

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <HomeWrapper>
               
                    <Link
                        to="/"
                        className="navbar-brand"
                        style={homeStyles}
                    >
                        Home
                    </Link>
                </HomeWrapper>
                <Collapse>
                    <List>
                        <Book>
                            <Link
                                to="/books"
                                className="nav-link"
                            >
                               Books
                            </Link>
                        </Book>
                        {/*
                        <Book>
                            <Link
                                to="/book/create"
                                className="nav-link"
                            >
                                Create book
                            </Link>
                        </Book>
                        */}
                        <Book>
                            <Link to="/books/react-table-v6" className="nav-link">
                            Employees Only
                            </Link>
                        </Book>
                    </List>
                </Collapse>
            </React.Fragment>
        );
    }
}

export default Links;
