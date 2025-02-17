const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const connectDB = require('./config/db');
const userTypeDefs = require('./schemas/userSchema');
const userResolvers = require('./resolvers/userResolvers');
const employeeTypeDefs = require('./schemas/employeeSchema');
const employeeResolvers = require('./resolvers/employeeResolvers');

require('dotenv').config();

connectDB();

const server = new ApolloServer({
    typeDefs: [userTypeDefs, employeeTypeDefs],
    resolvers: [userResolvers, employeeResolvers],
    context: ({ req }) => {
        const token = req.headers.authorization || '';
        return { token };
    }
});

const app = express();
server.start().then(() => {
    server.applyMiddleware({ app });
    app.listen(process.env.PORT || 4000, () => 
        console.log(`Server running at http://localhost:${process.env.PORT || 4000}/graphql`)
    );
});
