import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import ReadsHome from './ReadsHome';
import SearchList from './SearchList';
import './App.scss';
import * as BooksAPI from './BooksAPI';

class App extends Component {

    state = {
        books: [],
        search_books: []
    }

    componentDidMount() {
        this.getAllMyReads();
    };

    getAllMyReads = () => {
        BooksAPI.getAll().then((books) => {
            this.setState({books});
        });
    }

    // update
    changeShelf = (book, shelf) => {
        BooksAPI.update(book, shelf).then((res) => {
            this.getAllMyReads();
        });
    }

    queryBooks = (query) => {
        BooksAPI.search(query).then((search_books) => {
            for (let books_index = 0; books_index < this.state.books.length; books_index++) {
                for (let search_books_index = 0; search_books_index < search_books.length; search_books_index++) {
                    if (search_books[search_books_index].id === this.state.books[books_index].id) {
                        search_books[search_books_index] = this.state.books[books_index];
                    }
                }
            }

            this.setState({search_books});
        });
    }

    render() {
        return (
            <div className="app">
                <Route exact path='/'
                       render={() => (<ReadsHome books={this.state.books} onChangeShelf={(book, shelf) => {
                           this.changeShelf(book, shelf);
                       }}/>)}>
                </Route>
                <Route path='/search'
                       render={() => (<SearchList books={this.state.search_books} changeQuery={(query) => {
                           this.queryBooks(query);
                       }} onChangeShelf={(book, shelf) => {
                           this.changeShelf(book, shelf, 'search');
                       }}/>)}>
                </Route>
            </div>
        );
    }
}

export default App;
