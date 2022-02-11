import React, { useState } from "react";
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
  FunctionField,
  DeleteButton,
  Button,
} from "react-admin";
import { useForm } from "react-final-form";
import ShareIcon from "@material-ui/icons/Share";
import BookIcon from "@material-ui/icons/Book";
import { Dumpster } from "./index";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";
import { Record } from "ra-core";
import { useHistory } from "react-router-dom";

export const DumpsterIcon = BookIcon;

export const DumpsterList = (props: any) => {
  return (
    <List {...props} bulkActionButtons={false}>
      <Datagrid rowClick="show" rowStyle={getDumpsterColor}>
        <TextField source="location" />
        <DateField source="dateDropOff" />
        <DateField source="datePickedUp" />
        <EditButton basePath="/Dumpsters" />
      </Datagrid>
    </List>
  );
};

const DumpsterTitle = () => {
  return <span>Dumpster</span>;
};

const DumpsterActions = ({ basePath, data }: any) => (
  <TopToolbar>
    <ListButton basePath={basePath} record={data} />
    <ShowButton basePath={basePath} record={data} />
    <EditButton basePath={basePath} record={data} />
    <DeleteButton basePath={basePath} record={data} />
  </TopToolbar>
);
export const DumpsterEdit = (props: any) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
    libraries: ["places"],
  });

  return (
    <Edit title={<DumpsterTitle />} actions={<DumpsterActions />} {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        {isLoaded && <AddressAutoComplete />}
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
      actions={<DumpsterActions />}
      {...props}
    >
      <SimpleForm variant="filled" redirect="show">
        {isLoaded && <AddressAutoComplete />}

        <TextInput source="comments" rows={2} multiline resettable />
      </SimpleForm>
    </Create>
  );
};

const AddressAutoComplete = () => {
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

export const DumpsterShow = (props: any) => {
  const history = useHistory();

  const share = (d?: Dumpster) => {
    if (navigator.share && d) {
      navigator
        .share({
          title: d.location,
          text: d.comments,
          url: `/drop/${d?.id}`,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  };
  return (
    <Show title={<DumpsterTitle />} actions={<DumpsterActions />} {...props}>
      <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="location" />
        <TextField source="comments" />
        <DateField source="createdAt" showTime />
        <DateField source="dateDropOff" showTime />
        <DateField source="datePickedUp" showTime />
        <FunctionField<Dumpster>
          label="Links"
          render={(d?: Dumpster) => (
            <>
              <a href={`/drop/${d?.id}`}>Link to drop page</a>
              <Button
                color="secondary"
                children={<ShareIcon />}
                onClick={() => share(d)}
                label="Share"
              />
            </>
          )}
        />
      </SimpleShowLayout>
    </Show>
  );
};

export const getDumpsterColor = (d: Record) => {
  let backgroundColor = "white";

  if (!d.dateDropOff) {
    return {
      backgroundColor,
    };
  }
  const today = new Date();

  if (
    new Date(d.dateDropOff) <
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 25)
  ) {
    backgroundColor = "#AFA74CFF";
  }
  if (
    new Date(d.dateDropOff) <
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30)
  ) {
    backgroundColor = "#af4c4c";
  }

  if (d.datePickedUp) {
    backgroundColor = "#4caf50";
  }

  return {
    backgroundColor,
  };
};

export const datesAreOnSameDay = (first: Date, second: Date) =>
  first.getFullYear() === second.getFullYear() &&
  first.getMonth() === second.getMonth() &&
  first.getDate() === second.getDate();

export const datesInSameWeek = (first: Date, second: Date) => {
  const todayDate = first.getDate();
  const todayDay = first.getDay();

  // get first date of week
  const firstDayOfWeek = new Date(first.setDate(todayDate - todayDay));

  // get last date of week
  const lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6);

  // if date is equal or within the first and last dates of the week
  return second >= firstDayOfWeek && second <= lastDayOfWeek;
};

export const datesAreIn30Days = (first: Date, second: Date) => {
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;

  const timeDiffInMs = first.getTime() - second.getTime();

  return timeDiffInMs <= thirtyDaysInMs;
};
