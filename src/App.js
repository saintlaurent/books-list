import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BookList from './BookList';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
class App extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            allBooks: {'items': []},
            newBook: '',
            isLoading: false
        }
        
        this.handleInput = this.handleInput.bind(this);
        this.searchForBook = this.searchForBook.bind(this);
    }
    
    searchForBook(e){
        //Do not search for item if input is empty

        e.preventDefault();
        if(this.state.newBook === '') {
          return;
        }
        this.fetchResults(this.state.newBook);
    }
    
    handleInput(e){
        this.setState({
            newBook: e.target.value
        })
        
    }
    
    fetchResults(searchKeyword){
        this.setState({isLoading:true})
        const encodedSearchTerm = encodeURI(this.state.newBook);
         axios.get(`https://www.googleapis.com/books/v1/volumes?q=` + encodedSearchTerm)
            .then((response) => {

                    this.setState((prevState) => { console.log(prevState);
                        return {
                            allBooks: response.data,
                            newBook: '',
                            isLoading: false,
                            lastSearch: prevState.newBook 
                        }
                    });
            });
  
    }
  render() {
    return (
      <div className="App">
        <h1>Find a Book</h1>

        <Form onSubmit={this.searchForBook}>
            <Form.Group>
                <Form.Control
                    className="search"
                    type="text"
                    placeholder="e.g. Harry Potter"
                    value={this.state.newBook}
                    onChange={this.handleInput}
                />
            </Form.Group>

            <Button type="submit">Search for Book</Button>
        </Form>
        <div className="container">
            { this.state.isLoading ? <div className="spinner lds-dual-ring"></div> :
                <BookList 
                    newBook={this.state.newBook} 
                    allBooks={this.state.allBooks} 
                    lastSearch={this.state.lastSearch}
                />
            }
        </div>        
      </div>
    );
  }
}

export default App;
