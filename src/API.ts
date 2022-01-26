/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateDumpsterInput = {
  id?: string | null,
  name?: string | null,
  location?: string | null,
  comments?: string | null,
  datePickedUp?: string | null,
  dateDropOff?: string | null,
  _version?: number | null,
};

export type ModelDumpsterConditionInput = {
  name?: ModelStringInput | null,
  location?: ModelStringInput | null,
  comments?: ModelStringInput | null,
  datePickedUp?: ModelStringInput | null,
  dateDropOff?: ModelStringInput | null,
  and?: Array< ModelDumpsterConditionInput | null > | null,
  or?: Array< ModelDumpsterConditionInput | null > | null,
  not?: ModelDumpsterConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type Dumpster = {
  __typename: "Dumpster",
  id?: string,
  name?: string | null,
  location?: string | null,
  comments?: string | null,
  datePickedUp?: string | null,
  dateDropOff?: string | null,
  _version?: number,
  _deleted?: boolean | null,
  _lastChangedAt?: number,
  createdAt?: string,
  updatedAt?: string,
};

export type UpdateDumpsterInput = {
  id: string,
  name?: string | null,
  location?: string | null,
  comments?: string | null,
  datePickedUp?: string | null,
  dateDropOff?: string | null,
  _version?: number | null,
};

export type DeleteDumpsterInput = {
  id: string,
  _version?: number | null,
};

export type ModelDumpsterFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  location?: ModelStringInput | null,
  comments?: ModelStringInput | null,
  datePickedUp?: ModelStringInput | null,
  dateDropOff?: ModelStringInput | null,
  and?: Array< ModelDumpsterFilterInput | null > | null,
  or?: Array< ModelDumpsterFilterInput | null > | null,
  not?: ModelDumpsterFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelDumpsterConnection = {
  __typename: "ModelDumpsterConnection",
  items?:  Array<Dumpster | null >,
  nextToken?: string | null,
  startedAt?: number | null,
};

export type CreateDumpsterMutationVariables = {
  input?: CreateDumpsterInput,
  condition?: ModelDumpsterConditionInput | null,
};

export type CreateDumpsterMutation = {
  createDumpster?:  {
    __typename: "Dumpster",
    id: string,
    name?: string | null,
    location?: string | null,
    comments?: string | null,
    datePickedUp?: string | null,
    dateDropOff?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateDumpsterMutationVariables = {
  input?: UpdateDumpsterInput,
  condition?: ModelDumpsterConditionInput | null,
};

export type UpdateDumpsterMutation = {
  updateDumpster?:  {
    __typename: "Dumpster",
    id: string,
    name?: string | null,
    location?: string | null,
    comments?: string | null,
    datePickedUp?: string | null,
    dateDropOff?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteDumpsterMutationVariables = {
  input?: DeleteDumpsterInput,
  condition?: ModelDumpsterConditionInput | null,
};

export type DeleteDumpsterMutation = {
  deleteDumpster?:  {
    __typename: "Dumpster",
    id: string,
    name?: string | null,
    location?: string | null,
    comments?: string | null,
    datePickedUp?: string | null,
    dateDropOff?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetDumpsterQueryVariables = {
  id?: string,
};

export type GetDumpsterQuery = {
  getDumpster?:  {
    __typename: "Dumpster",
    id: string,
    name?: string | null,
    location?: string | null,
    comments?: string | null,
    datePickedUp?: string | null,
    dateDropOff?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListDumpstersQueryVariables = {
  filter?: ModelDumpsterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDumpstersQuery = {
  listDumpsters?:  {
    __typename: "ModelDumpsterConnection",
    items:  Array< {
      __typename: "Dumpster",
      id: string,
      name?: string | null,
      location?: string | null,
      comments?: string | null,
      datePickedUp?: string | null,
      dateDropOff?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type SyncDumpstersQueryVariables = {
  filter?: ModelDumpsterFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
  lastSync?: number | null,
};

export type SyncDumpstersQuery = {
  syncDumpsters?:  {
    __typename: "ModelDumpsterConnection",
    items:  Array< {
      __typename: "Dumpster",
      id: string,
      name?: string | null,
      location?: string | null,
      comments?: string | null,
      datePickedUp?: string | null,
      dateDropOff?: string | null,
      _version: number,
      _deleted?: boolean | null,
      _lastChangedAt: number,
      createdAt: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
    startedAt?: number | null,
  } | null,
};

export type OnCreateDumpsterSubscription = {
  onCreateDumpster?:  {
    __typename: "Dumpster",
    id: string,
    name?: string | null,
    location?: string | null,
    comments?: string | null,
    datePickedUp?: string | null,
    dateDropOff?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateDumpsterSubscription = {
  onUpdateDumpster?:  {
    __typename: "Dumpster",
    id: string,
    name?: string | null,
    location?: string | null,
    comments?: string | null,
    datePickedUp?: string | null,
    dateDropOff?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteDumpsterSubscription = {
  onDeleteDumpster?:  {
    __typename: "Dumpster",
    id: string,
    name?: string | null,
    location?: string | null,
    comments?: string | null,
    datePickedUp?: string | null,
    dateDropOff?: string | null,
    _version: number,
    _deleted?: boolean | null,
    _lastChangedAt: number,
    createdAt: string,
    updatedAt: string,
  } | null,
};
