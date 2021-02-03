import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchSingleBook, updateSingleBook } from '../actions';
import { shared } from '../constants';

import styled from 'styled-components';

const Title = styled.h1.attrs({
    className: 'h1',
})``;

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin-top: 0 30px;
`;

const Label = styled.label`
    margin: 5px;
    max-width: 30%;
`;

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px auto;
    max-width: 30%;
    text-align: center;
`;

const Fieldset = styled.fieldset.attrs({
    className: 'form-control',
})`
    border-color: transparent;
    margin: 1em auto 0.5em;
    max-width: 50%;
    min-height: 6em;
`;

const DayInput = styled.input.attrs({
    className: '',
})`
    margin: 5px auto;
    text-align: center;
`;

const Button = styled.button.attrs({
    className: 'btn btn-primary',
})`
  margin: 15px 15px 15px 5px;
`;

const CancelButton = styled.a.attrs({
    className: 'btn btn-danger',
})`
  margin: 15px 15px 15px 5px;
`;

class BookUpdate extends Component {
    constructor(props) {
        /**
         * Currently deprecated and now known as the "legacy context":
         * - https://reactjs.org/docs/legacy-context.html
         *
         * TODO: refactor to use new Context API:
         * - https://reactjs.org/docs/context.html
         */
        super(props);
        this.state = {
            _id: '',
            title: '',
            copies: '',
          
          
        };
    }

    componentDidMount() {
        this.props.fetchSingleBook(this.props.bookId)
            .then(resp => {
                const { book } = resp.data;
                this.setState({ ...book });
            });
    }
/*
    handleChangeInputName = async event => {
        const name = event.target.value;
        this.setState({ Title });
    }

    handleChangeInputCopies = async event => {
        console.log("Hello");
        const copies = event.target.value;
        this.setState({ copies });
    }





    handleUpdatebook = event => {
        const {
            _id,
           // title,
            copies,
         
        } = this.state;
        const book = { _id, copies };

        return this.props.updateSingleBook(book)
            .then(resp => {
                console.log("handleUpdatebook: resp");
                console.log(resp);
                if (typeof resp === "object" && (resp.status < 300 && resp.status >= 200)) {
                    window.alert('book updated successfully');
                    return true;
                } else {
                    throw resp;
                }
            })
            .catch(err => {
                window.alert(`There was an error updating the book... :(`);
                console.error("handleUpdatebook: err");
                console.error(err);
            });
    }

*/
    render() {
        const {
            _id,
            title,
            copies,
            author,
            
        } = this.state;

 
        return _id && (
            <Wrapper>
                <Title>More Info</Title>

              
                <h3>Title:</h3>
                <p>{title}</p>

                <h3>Author:</h3>
                <p>{author}</p>
                <Label>Update Number of Copies: </Label>

                <InputText
                    type="text"
                    value={copies}
                    onChange={this.handleChangeInputCopies}
                />

                       
                

             

            

                <Button onClick={this.confirmUpdatebook}>Update book</Button>
                <CancelButton href={'/books/list'}>Cancel</CancelButton>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...state,
        bookId: ownProps.match.params.id,
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({ fetchSingleBook, updateSingleBook }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BookUpdate);
