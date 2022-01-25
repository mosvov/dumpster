/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDumpster = /* GraphQL */ `
  query GetDumpster($id: ID!) {
    getDumpster(id: $id) {
      id
      name
      location
      dateDropOff
      datePickedUp
      createdAt
      updatedAt
    }
  }
`;
export const listDumpsters = /* GraphQL */ `
  query ListDumpsters(
    $filter: ModelDumpsterFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDumpsters(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        location
        dateDropOff
        datePickedUp
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
