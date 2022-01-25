import React from "react";
import { Resource, Admin } from "react-admin";
import { buildAuthProvider, buildDataProvider } from "react-admin-amplify";

import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";
import { Amplify } from "@aws-amplify/core";

import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import awsExports from "./aws-exports";
import Map from "./Map";

import {
  DumpsterList,
  DumpsterEdit,
  DumpsterCreate,
  DumpsterShow,
  DumpsterIcon,
} from "./models/dumpster";
import { Route, Routes } from "react-router-dom";
import Drop from "./Drop";

Amplify.configure(awsExports);

function App() {
  return (
    <Admin
      authProvider={buildAuthProvider({ authGroups: ["admin"] })}
      dataProvider={buildDataProvider(
        { queries, mutations },
        { authMode: GRAPHQL_AUTH_MODE.API_KEY }
      )}
    >
      <Resource
        name="Dumpsters"
        list={DumpsterList}
        create={DumpsterCreate}
        edit={DumpsterEdit}
        show={DumpsterShow}
        icon={DumpsterIcon}
      />

      {/* <Resource
        name="cognitoUsers"
        options={{ label: "Cognito Users" }}
        list={CognitoUserList}
        show={CognitoUserShow}
      />
      <Resource
        name="cognitoGroups"
        options={{ label: "Cognito Groups" }}
        list={CognitoGroupList}
      />*/}
    </Admin>
  );
}

export default App;
