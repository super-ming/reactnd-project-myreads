import React from 'react'
import * as BooksAPI from '../../BooksAPI'
import Book from '../book'
import { Link } from 'react-router-dom'

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      results: [],
      query: ""
    }
  }

  componentDidMount() {
    //once page is rendered, get all the books
    BooksAPI.getAll().then(res => {
      this.setState({ books: res })
    })
  }
//search page needs its own updateBook function because it cannot be passed from bookcase
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(res => {
      book.shelf = shelf;
      this.setState(state => ({
        books: state.books.filter(bk => bk.id !== book.id).concat([book])
      }));
    });
  }
//update search after each input
  updateQuery = (input) => {
    this.setState({query: input}, this.submitSearch );
  }

  submitSearch() {
    if(this.state.query === '' || this.state.query === undefined) {
      return this.setState({ results: [] });
    }
    //search BooksAPI for input after removing whitespace on both sides
    BooksAPI.search(this.state.query.trim()).then(res => {
      if(res.error) {
        return this.setState({ results: [] });
      } else {
        return this.setState({ results: res })
      }
    });
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query}
            onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            this.state.results.map((book, index) =>
            <Book updateBook={this.updateBook} key={index} book={book} />)
          }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchPage
