const graphql = require('graphql');
const _ = require('lodash');

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

// dummy book data
let books = [
	{ name: 'The Fellowship of the Ring', genre: 'Fantasy', id: '1' },
	{ name: 'The Two Towers', genre: 'Fantasy', id: '2' },
	{ name: 'The Return of the King', genre: 'Fantasy', id: '3' }
];

const BookType = new GraphQLObjectType({
	name: 'Book',
	fields: () => ({
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		genre: { type: GraphQLString }
	})
});

const RootQuery = new GraphQLObjectType({
	name: 'RootQueryType',
	fields: {
		book: {
			type: BookType,
			args: { id: { type: GraphQLString } },
			resolve(parent, args) {
				// code to get data from db/other source
				return _.find(books, { id: args.id });
			}
		}
	}
});

module.exports = new GraphQLSchema({
	query: RootQuery
});
