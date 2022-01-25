/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDumpster = /* GraphQL */ `
  mutation CreateDumpster(
    $input: CreateDumpsterInput!
    $condition: ModelDumpsterConditionInput
  ) {
    createDumpster(input: $input, condition: $condition) {
      id
      name
      location
      dateDropOff
      datePickedUp
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateDumpster = /* GraphQL */ `
  mutation UpdateDumpster(
    $input: UpdateDumpsterInput!
    $condition: ModelDumpsterConditionInput
  ) {
    updateDumpster(input: $input, condition: $condition) {
      id
      name
      location
      dateDropOff
      datePickedUp
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteDumpster = /* GraphQL */ `
  mutation DeleteDumpster(
    $input: DeleteDumpsterInput!
    $condition: ModelDumpsterConditionInput
  ) {
    deleteDumpster(input: $input, condition: $condition) {
      id
      name
      location
      dateDropOff
      datePickedUp
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
