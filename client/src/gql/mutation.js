import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($newUser: userInput!) {
    user: register(newUser: $newUser) {
      firstName
      lastName
      email
      password
    }
  }
`;

export const LOGIN = gql`
  mutation login($loginUser: loginUser!) {
    user: login(loginUser: $loginUser) {
      token
      email 
      password
    }
  }
`;

export const CREATE_QUOTE = gql`
  mutation createQuote($name: String!) {
    createQuote(name: $name)
  }
`;

export const UPDATE_PROFILE = gql`
  mutation updateUserDetails($data: updateData!) {
    updateUser(data: $data) {
      _id
      firstName
      lastName
      email
    }
  }
`;

export const DELETE_PROFILE = gql`
  mutation deleteUserWithQuote($_id: ID!) {
    deleteUser(_id: $_id)
  }
`;

export const UPDATE_QUOTE = gql`
  mutation updateQuote($update: updateQuote!) {
    updateQuote(update: $update) {
      _id
      name
    }
  }
`;
export const DELETE_QUOTE_ONLY = gql`
  mutation deleteQuote($_id: ID!) {
    alias:deleteQuoteOnly(_id: $_id)
  }
`;
