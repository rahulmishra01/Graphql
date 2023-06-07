import { gql } from "apollo-server-core";

const typeDefs = gql`
  type Query {
    users: [User]
    quote: [QuoteWithName]
    user(_id: ID!): User
    quotes(by: ID!): [Quote]
    myProfile: User
  }
  type QuoteWithName {
    name: String
    by: IdName
  }
  type IdName {
    _id: ID!
    firstName: String
  }
  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    quotes: [Quote]
  }
  type Quote {
    _id: ID!
    name: String
    by: ID!
  }
  type Token {
    token: String
    email: String!
    password: String!
  }
  type Mutation {
    register(newUser: userInput!): User
    login(loginUser: loginUser!): Token
    createQuote(name: String!): String
    updateUser(data: updateData!): User
    deleteUser(_id: ID!): ID
    updateQuote(update: updateQuote!): Quote
    deleteQuoteOnly(_id: ID!): ID
  }
  input updateQuote {
    by: ID!
    name: String
  }
  input userInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  input loginUser {
    email: String!
    password: String!
  }
  input updateData {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }
`;
export default typeDefs;
