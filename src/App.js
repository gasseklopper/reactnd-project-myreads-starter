import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Search from './Views/Search'
import Home from './Views/Home'
import './App.css'

class BooksApp extends React.Component {
	state = {
		books: []
	}

	componentDidMount() {
		BooksAPI.getAll()
			.then((books) => {
				this.setState({
					books
				})
			})
	}

	moveBook = (book, shelf) => {
		const index = this.state.books.indexOf(book)
		const updatedBooks = [...this.state.books]

		if (shelf === 'none') {
			updatedBooks.splice(index, 1)
		} else if (book.shelf === 'none') {
			const updatedBook = { ...book, shelf }
			updatedBooks.push(updatedBook)
		} else {
			const updatedBook = { ...book, shelf }
			updatedBooks[index] = updatedBook
		}

		BooksAPI.update(book, shelf)
			.then(() => {
				this.setState({
					books: updatedBooks
				})
			})
	}

	render() {
		return (
			<BrowserRouter>
				<div className='app'>
					<Route exact path='/' render={() => (
						<Home books={this.state.books} updateShelf={this.moveBook} />
					)} />
					<Route path='/search' render={() => (
						<Search books={this.state.books} updateShelf={this.moveBook} />
					)} />
				</div>
			</BrowserRouter>
		)
	}
}

export default BooksApp
