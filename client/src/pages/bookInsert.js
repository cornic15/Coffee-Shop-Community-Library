import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { insertSingleBook } from '../actions';
// import { shared } from '../constants';

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

    @media screen and (max-width: 420px) {
        height: auto;
        max-width: 75%;
    }
`;

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px auto;
    max-width: 30%;
    text-align: center;

    @media screen and (max-width: 420px) {
        height: auto;
        max-width: 75%;
    }
`;

const Fieldset = styled.fieldset.attrs({
    className: 'form-control',
})`
    background-color: transparent;
    border-color: transparent;
    margin: 1em auto 0.5em;
    max-width: 50%;
    min-height: 6em;

    @media screen and (max-width: 420px) {
        height: auto;
        max-width: 75%;
    }
`;

const DayInput = styled.input.attrs({
    className: '',
})`
    margin: 5px 5px 5px auto;
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

class BookInsert extends Component {
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
           // name: '',
           // daysOfWeek: {},
           // timeframeNote: '',
           // priority: 0,
           // content: '',
        // Title: '',
        //copies: '',
        book:{},
        isbn:0,
    
        title: '',
          
        author: '',
    
        publication_year: '',
         
        publisher: '',
         
        image_url_s: '',
         
        image_url_m: '',
         
        image_url_l: '',
        
        copies: 0,
         
        available: 0
         


        };
    }

    handleChangeInputName = async event => {
        const name = event.target.value;
        this.setState({ Title });
    }


    handleChangeInputIsbn = async event => {
        const isbn = event.target.value;
        this.setState({ isbn });
     
    }
    handleChangeInputTitle = async event => {
        const title = event.target.value;
        this.setState({ title });
     
    }

    handleChangeInputAuthor = async event => {
        const author = event.target.value;
        this.setState({ author});
     
    }

    handleChangeInputPubYear = async event => {
        const publication_year = event.target.value;
        this.setState({ publication_year });
     
    }

    handleChangeInputPublisher = async event => {
        const publisher = event.target.value;
        this.setState({ publisher });
     
    }

    handleChangeInputImgS = async event => {
        const image_url_s = event.target.value;
        this.setState({ image_url_s });
     
    }

  

    handleChangeInputImgM = async event => {
        const image_url_m = event.target.value;
        this.setState({ image_url_m });
     
    }

    handleChangeInputImgL = async event => {
        const image_url_l= event.target.value;
        this.setState({ image_url_l });
     
    }

    handleChangeInputCopies = async event => {
        const copies = event.target.value;
        this.setState({ copies });
     
    }

    handleChangeInputAvailable = async event => {
        const available = event.target.value;
        this.setState({ available });
     
    }

  
/*
    handleChangeDays = async event => {
        const { checked, value } = event.target;
        const { daysOfWeek } = this.state;
       const { DAYS_OF_WEEK } = shared;

        if (checked && !daysOfWeek[value]) {
            daysOfWeek[value] = DAYS_OF_WEEK[value];
        } else if (!checked && daysOfWeek[value]) {
            delete daysOfWeek[value];
        }
        this.setState({ daysOfWeek });
    }

    handleChangeInputTimeframe = async event => {
        const timeframeNote = event.target.value;
        this.setState({ timeframeNote });
    }

    handleChangeInputPriority = async event => {
        const priority = event.target.validity.valid
            ? event.target.value
            : this.state.priority;

        this.setState({ priority });
    }

    handleChangeInputContent = async event => {
        const content = event.target.value;
        this.setState({ content });
    }
*/
    handleInsertBook = event => {
        event.preventDefault();
//alert(title);
        const {
           // name,
           // daysOfWeek,
           // timeframeNote,
            //priority,
           // content
          // Title
         // copies

         isbn,
    
         title,
           
         author,
     
         publication_year,
          
         publisher,
          
         image_url_s,
          
         image_url_m,
          
         image_url_l,
         
         copies,
          
         available
        } = this.state;
        alert(title);
       const book = { isbn: isbn, title: title, author: author, publication_year:publication_year, 
        publisher: publisher, image_url_s: image_url_s, image_url_m:image_url_s, image_url_l:image_url_l,
         copies:copies, available:available };
      // const book = {copies};
     console.log({book})

        this.props.insertSingleBook(book)
            .then(resp => {
                alert(resp);
                console.log("handleInsertbook: resp");
                console.log(resp);
                
                if (typeof resp === "object" && (resp.status < 300 && resp.status >= 200)) {
                    window.alert('book inserted successfully');
                    this.setState({
                     //   name: '',
                      //  daysOfWeek: {},
                       // timeframeNote: '',
                      //  priority: 0,
                       // content: '',
                         //Title: '',
                        // copies: 0,

                        isbn:0,
    
                        title: '',
                          
                        author: '',
                    
                        publication_year: '',
                         
                        publisher: '',
                         
                        image_url_s: '',
                         
                        image_url_m: '',
                         
                        image_url_l: '',
                        
                        copies: 0,
                         
                        available: 0
                         
                    });
                } else {
                    throw resp;
                }
            })
            .catch(err => {
                // TODO: pass error object correctly so that things like validation errors can be displayed to user
                window.alert(`There was an error creating the book... :(`);
                console.log("handleInsertbook: err");
                console.log(err);
            })
    }

    render() {
        const {
           // name,
           // daysOfWeek,
           // timeframeNote,
           // priority,
            //content
           // Title
           //copies
           isbn,
           title,
            author,
       publication_year,
            publisher,
            image_url_s,
             image_url_m,
            image_url_l,
           copies,
            available
            
        } = this.state;

      //  const { DAYS_OF_WEEK } = shared;
/*
        return (
            <Wrapper>
               <Title>Create book</Title> 

                <Label>Name: </Label>
                <InputText
                    type="text"
                   // value={name}
                     value={Title}
                    onChange={this.handleChangeInputName}
                />
                */


               return (
                   
                <div style = {{
                    backgroundColor: 'lightcyan',
                    width: '50%',
                    justifyContent:'center',
                    alignItems:'center',
                    margin: '0 auto'
                    
  
                }}>
                        <style>{'body { background-color: dodgerblue; }'}</style>
                    
                   <Title>Create a Book</Title> 
    
                    <Label>ISBN: </Label>
                    <InputText
                        type="text"
                       // value={name}
                         value={isbn}
                        onChange={this.handleChangeInputIsbn}

                        
                    />

<Label>Title: </Label>
                    <InputText
                        type="text"
                       // value={name}
                         value={title}
                        onChange={this.handleChangeInputTitle}

                        
                    />

<Label>Author: </Label>
                    <InputText
                        type="text"
                       // value={name}
                         value={author}
                        onChange={this.handleChangeInputAuthor}

                        
                    />

<Label>Publication Year: </Label>
                    <InputText
                        type="text"
                       // value={name}
                         value={publication_year}
                        onChange={this.handleChangeInputPubYear}

                        
                    />

<Label>Publisher: </Label>
                    <InputText
                        type="text"
                       // value={name}
                         value={publisher}
                        onChange={this.handleChangeInputPublisher}

                        
                    />
                    <Label>Small Image URL: </Label>
                    <InputText
                        type="text"
                       // value={name}
                         value={image_url_s}
                        onChange={this.handleChangeInputImgS}

                        
                    />

<Label>Medium Image URL </Label>
                    <InputText
                        type="text"
                       // value={name}
                         value={image_url_m}
                        onChange={this.handleChangeInputImgM}

                        
                    />

<Label>Large Image URL </Label>
                    <InputText
                        type="text"
                       // value={name}
                         value={image_url_l}
                        onChange={this.handleChangeInputImgL}

                        
                    />

<Label>Copies </Label>
                    <InputText
                        type="text"
                       // value={name}
                         value={copies}
                        onChange={this.handleChangeInputCopies}

                        
                    />

<Label>Available </Label>
                    <InputText
                        type="text"
                       // value={name}
                         value={available}
                        onChange={this.handleChangeInputAvailable}

                        
                    />





{/*
                <Fieldset>
                    <legend>Day(s) of the Week: </legend>
                    {Object.keys(DAYS_OF_WEEK).map((day, i) => (
                        <React.Fragment
                            key={day}
                        >
                            <Label
                                htmlFor={day}
                            >
                                <DayInput
                                    type="checkbox"
                                    id={day}
                                    value={day}
                                    onChange={this.handleChangeDays}
                                    checked={typeof daysOfWeek[day] === "string"}
                                />
                                { DAYS_OF_WEEK[day] }
                            </Label>
                        </React.Fragment>
                    ))}
                </Fieldset>
                   
                <Label>Timeframe Note: </Label>
                <InputText
                    type="text"
                    value={timeframeNote}
                    onChange={this.handleChangeInputTimeframe}
                />
                <Label>Priority: </Label>
                <InputText
                    type="number"
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="1000"
                    pattern="[0-9]+([,\.][0-9]+)?"
                    value={priority}
                    onChange={this.handleChangeInputPriority}
                />

                <Label>Content: </Label>
                <InputText
                    type="textarea"
                    value={content}
                    onChange={this.handleChangeInputContent}
                />
 */}
                <Button onClick={this.handleInsertBook}>Add book</Button>
                <CancelButton href={'/books/list'}>Cancel</CancelButton>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ insertSingleBook }, dispatch);

export default connect(null, mapDispatchToProps)(BookInsert);
