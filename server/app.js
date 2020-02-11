const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const cors = require('cors');
require('dotenv').config();
require('./config/database');
const app = express();

// Allow cross-origin requests
app.use(cors());

app.use(
	'/graphql',
	graphqlHTTP({
		schema,
		graphiql: true
	})
);
app.listen(4000, () => {
	console.log('now listening for requests on port 4000!');
});
