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
    // get all my reads
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
    // find books by query string
    queryBooks = (query) => {
        BooksAPI.search(query).then((search_books) => {
            search_books && this.setState({search_books});
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
                       render={() => (<SearchList searchBooks={this.state.search_books} books={this.state.books} changeQuery={(query) => {
                           this.queryBooks(query);
                       }} onChangeShelf={(book, shelf) => {
                           this.changeShelf(book, shelf);
                       }}/>)}>
                </Route>
            </div>
        );
    }
}

export default App;
