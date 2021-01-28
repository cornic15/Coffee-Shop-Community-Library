import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Delete = styled.div.attrs({
    className: "delete-book-btn"
})`
  color: #ff0000;
  cursor: pointer;
`;

class DeleteButton extends Component {
    confirmDeletebook = event => {
        event.preventDefault();

        if (
            window.confirm(
                `Do you want to permanently delete this book? ${this.props.id}`,
            )
        ) {
            this.props.onDelete(this.props.id);
        }

    }

    render() {
        return <Delete onClick={this.confirmDeletebook}>Delete book</Delete>;
    }
}

DeleteButton.propTypes = {
    id: PropTypes.string,
};

export default DeleteButton;
