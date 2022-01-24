// tslint:disable
// this is an auto generated file. This will be overwritten

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
        dateDropOff
        datePickedUp
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getDumpster = /* GraphQL */ `
  query GetDumpster($id: ID!) {
    getDumpster(id: $id) {
      id
      name
      location
      dateDropOff
      datePickedUp
      _version
      _deleted
      _lastChangedAt
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
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
