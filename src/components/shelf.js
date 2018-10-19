import React from 'react'
import * as BooksAPI from '../BooksAPI'
import Book from './book'
import Background from '../images/bookshelf.png'

class Shelf extends React.Component {
  //After rendering, get all books with their current shelf status
  componentDidMount() {
    BooksAPI.getAll()
  }
//map over each book and render a book in their corresponding shelf
  render() {
    return (
      <div className="bookshelf" style={ {backgroundImage: `url("${Background}")`} } >
        <h2 className="bookshelf-title">{this.props.shelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              this.props.books.map((book, index) =>
              <Book updateBook={this.props.updateBook} book={book} key={index} />)
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf
