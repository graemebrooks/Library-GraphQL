import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { getBooksQuery } from '../queries/queries';

// Components
import BookDetails from './BookDetails';

function BookList(props) {
	const [ state, setState ] = useState({
		selected: null
	});
	function displayBooks() {
		let data = props.data;
		if (data.loading) {
			return <div>Loading Books...</div>;
		} else {
			return data.books.map((book) => {
				return (
					<li
						key={book.id}
						onClick={(e) => {
							setState({ selected: book.id });
						}}
					>
						{book.name}
					</li>
				);
			});
		}
	}
	return (
		<div>
			<ul id="book-list">{displayBooks()}</ul>
			<BookDetails bookId={state.selected} />
		</div>
	);
}

export default graphql(getBooksQuery)(BookList);
