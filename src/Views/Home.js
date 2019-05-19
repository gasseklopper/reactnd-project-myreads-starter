import React from 'react'
import { Link } from 'react-router-dom'
import Shelf from '../Components/Shelf'

const Home = (props) => {
	const filterBooks = (books, filterShelf) => {
		return books.filter((book) => {
			return book.shelf === filterShelf
		})
	}

	const shelf = [
		{ shelfSelector: 'currentlyReading', text: 'Currently Reading' },
		{ shelfSelector: 'wantToRead', text: 'Want to Read' },
		{ shelfSelector: 'read', text: 'Read' }
	]

	return(
		<div className="list-books">
			<div className="list-books-title">
				<h1>MyReads</h1>
			</div>
			<div className="list-books-content">
				<div>
					{shelf.map((shelf) => {
						return (
							<Shelf
								key={shelf.shelfSelector}
								title={shelf.text}
								books={filterBooks(props.books, shelf.shelfSelector)}
								updateShelf={props.updateShelf} />
						)
					})}
				</div>
			</div>
			<div className="open-search">
				<Link to='/search'><button>Add a book</button></Link>
			</div>
		</div>
	)
}

export default Home
