import React from 'react'
import Book from '../Components/Book'

const Shelf = (props) => {
	return (
		<div className="bookshelf">
			<h2 className="bookshelf-title">{props.title}</h2>
			<div className="bookshelf-books">
				<ol className="books-grid">
					{props.books.length === 0 ?
						<li key='empty'><h3>No books in shelf</h3></li> : props.books.map((book) => {
							return (
								<li key={book.id}>
									<Book book={book} updateShelf={props.updateShelf} />
								</li>
							)
					})}
				</ol>
			</div>
		</div>
	)
}

export default Shelf
