import React, { Component } from 'react';

import ListGroup from 'react-bootstrap/ListGroup';


class BookList extends Component {

    constructor(props){
        super(props);
    }

    render() {

        if( this.props.allBooks.totalItems === 0) {
            return (<div>No books found for item {this.props.lastSearch}</div>);
        }
        const listOfBooks = this.props.allBooks.items.map((book, index) => {

            return (
                <ListGroup.Item className="book" key={index}>
                    <img src={book.volumeInfo.imageLinks['thumbnail']}></img>
                    <p className="book-title"><a href={book.accessInfo.webReaderLink}>{book.volumeInfo.title}</a></p>
                    <h4>Categories: {book.volumeInfo.categories}</h4>
                    <p className="description">{book.volumeInfo.description}</p>
                    
                </ListGroup.Item>
            )
        });
        return (
            <div className="main">
                <ListGroup>{listOfBooks}</ListGroup>
            </div>
        );
    }
}

export default BookList;
