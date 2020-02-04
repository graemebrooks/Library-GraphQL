const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList } = graphql;

// dummy book data
let books = [
	{ name: 'The Fellowship of the Ring', genre: 'Fantasy', id: '1', authorId: '1' },
	{ name: 'The Two Towers', genre: 'Fantasy', id: '2', authorId: '1' },
	{ name: 'The Return of the King', genre: 'Fantasy', id: '3', authorId: '1' },
	{ name: 'The Lion, the Witch, and the Wardrobe', genre: 'Fantasy', id: '4', authorId: '3' },
	{ name: 'Harry Potter and The Champber of Secrets', genre: 'Fantasy', id: '5', authorId: '2' }
];

let authors = [
	{ name: 'J.R.R Tolkien', age: 120, id: '1' },
	{ name: 'J.K Rowling', age: 55, id: '2' },
	{ name: 'C.S. Lewis', age: 99, id: '3' }
];

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		genre: { type: GraphQLString },
		author: {
			type: AuthorType,
			resolve(parent, args) {
				return _.find(authors, { id: parent.authorId });
			}
		}
	})
});

const AuthorType = new GraphQLObjectType({
	name: 'Author',
	fields: () => ({
		id: { type: GraphQLID },
		name: { type: GraphQLString },
		age: { type: GraphQLInt },
		books: {
			type: new GraphQLList(BookType),
			resolve(parent, args) {
				return _.filter(books, { authorId: parent.id });
			}
		}
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				// code to get data from db/other source
				return _.find(books, { id: args.id });
			}
		},
		author: {
			type: AuthorType,
			args: { id: { type: GraphQLID } },
			resolve(parent, args) {
				return _.find(authors, { id: args.id });
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
