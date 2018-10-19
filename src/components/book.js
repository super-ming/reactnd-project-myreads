import React from 'react'

class Book extends React.Component {
  render() {
    //if the first condition is true, then run second condition
    const thumbnail = (this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : '');
    //if book is currently on a shelf
    const shelf = this.props.book.shelf;
    //if book has authors and more than one author, add a comma between then
    const authors = (this.props.book.authors && this.props.book.authors.join(", "));
    const avgRating = (this.props.book.averageRating ? `"Avg. Rating: "${this.props.book.averageRating}` : "No ratings")
    const categories = (this.props.book.categories ? this.props.book.categories : "No categories") ;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={ {width: 128, height: 192, backgroundImage: `url("${thumbnail}")`} }></div>
            <div className="book-shelf-changer">
              <select value={ shelf || "none" } onChange={ (event) => {this.props.updateBook(this.props.book, event.target.value)} }>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">{authors || "No authors"}</div>
          <div className="book-authors">{avgRating}</div>
          <div className="book-authors">{categories}</div>
        </div>
      </li>
    )
  }
}

export default Book
