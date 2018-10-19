import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from '../shelf'
import * as BooksAPI from '../../BooksAPI'

class BookCase extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books:[]
    }
  }
  //pull data from API once mainpage component is mounted/rendered and add response to books array in state
  componentDidMount() {
    BooksAPI.getAll().then(res => {
      this.setState({ books: res })
    })
  }
  //update books array in state with filtering books that is not selected book,
  //then add back selected book because at this point it would have a new shelf
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(res => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(bk => bk.id !== book.id).concat([book])
      }));
    });
  }

  render() {
    return (
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <Shelf updateBook={this.updateBook} shelfName="Currently Reading" books={this.state.books.filter(book => book.shelf === "currentlyReading")}/>
              <Shelf updateBook={this.updateBook} shelfName="Want to Read" books={this.state.books.filter(book => book.shelf === "wantToRead")}/>
              <Shelf updateBook={this.updateBook} shelfName="Read" books={this.state.books.filter(book => book.shelf === "read")}/>
            </div>
          </div>
          <div className="open-search">
            <Link to='/search'>Add a book</Link>
          </div>
        </div>
      )
    }
  }

export default BookCase
