import React from "react";
import { Resource, Admin } from "react-admin";
import { buildAuthProvider, buildDataProvider } from "react-admin-amplify";
import { createBrowserHistory as createHistory } from "history";
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api";

import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";

import {
  DumpsterList,
  DumpsterEdit,
  DumpsterCreate,
  DumpsterShow,
  DumpsterIcon,
} from "./models/dumpster";

import { customRoutes, Menu } from "./pages/menu";

const history = createHistory();

export default function App() {
  return (
    <Admin
      menu={Menu}
      history={history}
      customRoutes={customRoutes}
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
    </Admin>
  );
}
