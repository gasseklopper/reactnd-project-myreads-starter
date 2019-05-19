import React from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import Book from '../Components/Book'

class Search extends React.Component {
	state = {
		value: '',
		results: []
	}

	searchBooks = () => {
		BooksAPI.search(this.state.value)
			.then(results => {
				const newResults = results.map(result => {
					const index = this.props.books.find(book => {
						return book.id === result.id
					})
					if (index !== undefined) {
						return index
					} else {
						return { ...result, shelf: 'none' }
					}
				})
				return newResults
			})
			.then(results => {
				this.setState({
					results,
				})
			})
			.catch(() => {
				this.setState({
					results: []
				})
			})
	}

	handleChange = event => {
		const searchTerm = event.target.value;
		this.setState({value: event.target.value},
			() => {
				if (searchTerm !== '') {
					this.searchBooks()
				} else {
					this.setState({
						results: [],
					})
				}
			}
		)
	}

	render() {
		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to="/">Close</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							onChange={this.handleChange}
							value={this.state.value}
							placeholder="Search by title or author"
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.state.results.length === 0 ? <li key="no-results"><h1>No results</h1></li>
						 : this.state.results.map(book => {
							return (
								<li key={book.id}>
									<Book book={book} updateShelf={this.props.updateShelf} />
								</li>
								)
						})}
					</ol>
				</div>
			</div>
		)
	}
}

export default Search
