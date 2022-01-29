import React, { useState, useRef } from "react";
import {
  List,
  Datagrid,
  Edit,
  Create,
  SimpleForm,
  DateField,
  TextField,
  EditButton,
  TextInput,
  DateTimeInput,
  TopToolbar,
  ListButton,
  ShowButton,
  Show,
  SimpleShowLayout,
  required,
  FormDataConsumer,
  Labeled,
  FunctionField,
} from "react-admin";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import { useForm } from "react-final-form";
import { Field } from "react-final-form";

import BookIcon from "@material-ui/icons/Book";
import { Dumpster } from "./index";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
export const DumpsterIcon = BookIcon;

export const DumpsterList = (props: any) => (
  <List {...props}>
    <Datagrid rowClick="show">
      <TextField source="name" />
      <TextField source="location" />
      <DateField source="createdAt" />
      <DateField source="dateDropOff" />
      <DateField source="datePickedUp" />
      <EditButton basePath="/Dumpsters" />
    </Datagrid>
  </List>
);

const DumpsterTitle = ({ record }: { record?: Dumpster }) => {
  return <span>Dumpster {record ? `"${record.name}"` : ""}</span>;
};

const DumpsterEditActions = ({ basePath, data }: any) => (
  <TopToolbar>
    <ListButton basePath={basePath} label="Back" icon={<ChevronLeft />} />
    <ShowButton basePath={basePath} record={data} />
  </TopToolbar>
);
export const DumpsterEdit = (props: any) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  return (
    <Edit
      title={<DumpsterTitle />}
      actions={<DumpsterEditActions />}
      {...props}
    >
      <SimpleForm>
        <TextInput disabled source="id" />
        {isLoaded && <AdressAutoComplete />}
        <TextInput source="comments" rows={2} multiline resettable />
        <DateTimeInput source="dateDropOff" resettable />
        <DateTimeInput source="datePickedUp" resettable />
      </SimpleForm>
    </Edit>
  );
};

export const DumpsterCreate = (props: any) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  return (
    <Create
      title="Create a Dumpster drop off request"
      actions={<DumpsterEditActions />}
      {...props}
    >
      <SimpleForm variant="filled" redirect="show">
        {isLoaded && <AdressAutoComplete />}

        <TextInput source="comments" rows={2} multiline resettable />
      </SimpleForm>
    </Create>
  );
};

const AdressAutoComplete = () => {
  const form = useForm();
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();

  const onLoad = (a: google.maps.places.Autocomplete) => setAutocomplete(a);
  const onPlaceChanged = () => {
    form.change("location", autocomplete?.getPlace()?.formatted_address);

    const latLng = autocomplete?.getPlace()?.geometry?.location?.toJSON();
    form.change("latLng", JSON.stringify(latLng));
  };

  return (
    <>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <TextInput
          style={{ width: 256 }}
          source="location"
          validate={required()}
        />
      </Autocomplete>
      <TextInput style={{ display: "none" }} source="latLng" />
    </>
  );
};

export const DumpsterShow = (props: any) => (
  <Show {...props}>
    <SimpleShowLayout>
      <TextField source="id" />
      <TextField source="location" />
      <TextField source="comments" />
      <DateField source="createdAt" />
      <DateField source="dateDropOff" />
      <DateField source="datePickedUp" />
      <FunctionField<Dumpster>
        label="Share"
        render={(d?: Dumpster) => (
          <a href={`/drop/${d?.id}`}>Link to drop page</a>
        )}
      />
    </SimpleShowLayout>
  </Show>
);
