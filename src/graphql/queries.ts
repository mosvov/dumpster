/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDumpster = /* GraphQL */ `
  query GetDumpster($id: ID!) {
    getDumpster(id: $id) {
      id
      name
      location
      comments
      datePickedUp
      dateDropOff
      _version
      _deleted
      _lastChangedAt
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
        comments
        datePickedUp
        dateDropOff
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncDumpsters = /* GraphQL */ `
  query SyncDumpsters(
    $filter: ModelDumpsterFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncDumpsters(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        location
        comments
        datePickedUp
        dateDropOff
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
