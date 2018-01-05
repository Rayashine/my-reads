import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import BookList from './BookList';

class SearchList extends Component {

    onChangeQuery = (query) => {
        if (this.props.changeQuery) {
            this.props.changeQuery(query);
        }
    }

    bookChangeShelf = (book, shelf) => {
        if (this.props.onChangeShelf) {
            this.props.onChangeShelf(book, shelf);
        }
    }

    render() {
        const { searchBooks, books } = this.props;
        // compare searchBooks width my reads,and set the correct shelf to everyone in searchBooks
        for (let books_index = 0; books_index < books.length; books_index++) {
            for (let search_books_index = 0; search_books_index < searchBooks.length; search_books_index++) {
                if (searchBooks[search_books_index].id === books[books_index].id) {
                    searchBooks[search_books_index] = books[books_index];
                }
            }
        }

        return (
            <div>
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to='/'>Close</Link>
                        <div className="search-books-input-wrapper">
                            <input type="text" placeholder="Search by title or author"
                                   onChange={(event) => {
                                       this.onChangeQuery(event.target.value)
                                   }}/>
                        </div>
                    </div>
                    <div className="search-books-results">
                        <BookList books={searchBooks} onChangeShelf={(book, shelf) => {
                            this.bookChangeShelf(book, shelf);
                        }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchList;