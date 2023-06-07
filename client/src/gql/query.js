import { gql } from "@apollo/client";

export const GET_ALL_QUOTES = gql`
  query getAllQuotes {
    quote {
      name
      by {
        _id
        firstName
      }
    }
  }
`;

export const GET_SINGLE_USER = gql`
  query findUserbyId($userId: ID!) {
    user(_id: $userId) {
      firstName
      lastName
      email
    }
  }
`;

export const GET_PROFILE = gql`
  query getProfileUser {
    myProfile {
      _id
      firstName
      lastName
      email
      quotes {
        _id
        name
      }
    }
  }
`;
