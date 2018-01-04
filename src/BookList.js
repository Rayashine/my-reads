import React, {Component} from 'react';

class BookList extends Component {

    onChangeShelf = (book, shelf) => {
        if (this.props.onChangeShelf) {
            this.props.onChangeShelf(book, shelf);
        }
    }

    render() {
        const { books } = this.props;
        return (
            <ol className='books-grid'>
                {books && books.map((book) => (
                    <li key={book.id}>
                        <div className='book'>
                            <div className='book-top'>
                                <div className="book-cover" style={{
                                    backgroundImage: `url(${book.imageLinks.smallThumbnail})`,
                                    width: `120px`,
                                    height: `198px`
                                }}>
                                </div>
                                <div className="book-shelf-changer">
                                    <select defaultValue={book.shelf} onChange={(event) => {
                                        this.onChangeShelf(book, event.target.value);
                                    }}>
                                        <option value="none" disabled="">Move to...</option>
                                        <option value="currentlyReading">Currently Reading</option>
                                        <option value="wantToRead">Want to Read</option>
                                        <option value="read">Read</option>
                                        <option value="none">None</option>
                                    </select>
                                </div>
                            </div>
                            <div className='book-title'>{book.title}</div>
                            {book.authors && book.authors.map((author) => (
                                <div key={author} className='book-authors'>{author}</div>
                            ))}
                        </div>
                    </li>
                ))
                }
            </ol>
        );
    }
}

export default BookList;