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
        const { books } = this.props;
        console.log(books);
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
                        <BookList books={books} onChangeShelf={(book, shelf) => {
                            this.bookChangeShelf(book, shelf);
                        }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchList;