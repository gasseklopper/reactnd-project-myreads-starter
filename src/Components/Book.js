import React from 'react'
import Author from '../Components/Author'

class Book extends React.Component {
	state = {
		value: this.props.book.shelf ? this.props.book.shelf : 'none'
	}

	handleChange = (e) => {
		this.props.updateShelf(this.props.book, e.target.value)
		this.setState({value: e.target.value})
	}

	render() {
		return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover"
						style={{
						 width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks ? this.props.book.imageLinks.thumbnail : ''})`
						}}>
					</div>
					<div className="book-shelf-changer">
						<select value={this.state.value} onChange={this.handleChange}>
							<option value="disabled" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{this.props.book.title}</div>
					<div className="book-authors">
						<ul>
							{this.props.book.authors ? this.props.book.authors.map((author, i) => <Author key={i} name={ author }/> ) : 'There is no given  author'}
						</ul>
					</div>
			</div>
		)
	}
}

export default Book