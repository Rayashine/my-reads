import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import ListHeader from './ListHeader';
import BookList from './BookList';

class ReadsHome extends Component {

    bookChangeShelf = (book, shelf) => {
        if (this.props.onChangeShelf) {
            this.props.onChangeShelf(book, shelf);
        }
    }

    render() {
        const { books } = this.props;
        let curr_books = books.filter((book) => book.shelf === 'currentlyReading'),
            want_books = books.filter((book) => book.shelf === 'wantToRead'),
            read_books = books.filter((book) => book.shelf === 'read');

        return (
            <div className='list-books'>
                <ListHeader/>
                <div className='list-books-content'>
                    <div className='bookshelf'>
                        <h2 className='bookshelf-title'>Currently Reading</h2>
                        <div className='bookshelf-books'>
                            <BookList books={curr_books} onChangeShelf={(book, shelf) => {
                                this.bookChangeShelf(book, shelf);
                            }}/>
                        </div>
                    </div>
                    <div className='bookshelf'>
                        <h2 className='bookshelf-title'>Want to Read</h2>
                        <div className='bookshelf-books'>
                            <BookList books={want_books} onChangeShelf={(book, shelf) => {
                                this.bookChangeShelf(book, shelf);
                            }}/>
                        </div>
                    </div>
                    <div className='bookshelf'>
                        <h2 className='bookshelf-title'>Read</h2>
                        <div className='bookshelf-books'>
                            <BookList books={read_books} onChangeShelf={(book, shelf) => {
                                this.bookChangeShelf(book, shelf);
                            }}/>
                        </div>
                    </div>
                </div>
                <div className="open-search">
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        );
    }
}

export default ReadsHome;