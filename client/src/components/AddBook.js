import React, { useState } from 'react';
import { graphql } from 'react-apollo';
import { flowRight as compose } from 'lodash';
import { getAuthorsQuery, addBookMutation } from '../queries/queries';

function AddBook(props) {
	const [ formData, setFormData ] = useState({
		name: '',
		genre: '',
		authorId: ''
	});
	function displayAuthors() {
		let data = props.getAuthorsQuery;
		if (data.loading) {
			return <option disabled>Loading Authors...</option>;
		} else {
			return data.authors.map((author) => {
				return (
					<option key={author.id} value={author.id}>
						{author.name}
					</option>
				);
			});
		}
	}
	function submitForm(e) {
		e.preventDefault();
		props.addBookMutation({
			variables: {
				name: formData.name,
				genre: formData.genre,
				authorId: formData.authorId
			}
		});
	}
	return (
		<form id="add-book" onSubmit={(e) => submitForm(e)}>
			<div className="field">
				<label>Book Name:</label>
				<input type="text" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
			</div>

			<div className="field">
				<label>Genre:</label>
				<input type="text" onChange={(e) => setFormData({ ...formData, genre: e.target.value })} />
			</div>

			<div className="field">
				<label>Author:</label>
				<select onChange={(e) => setFormData({ ...formData, authorId: e.target.value })}>
					<option>Select author</option>
					{displayAuthors()}
				</select>
			</div>
			<button>Add Book</button>
		</form>
	);
}

export default compose(
	graphql(getAuthorsQuery, { name: 'getAuthorsQuery' }),
	graphql(addBookMutation, { name: 'addBookMutation' })
)(AddBook);
