import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Title } from "react-admin";
import { DataStore } from "@aws-amplify/datastore";
import { Dumpster } from "../models";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import CachedIcon from "@material-ui/icons/Cached";
import { PostFilterForm, MapFilters } from "./mapFilters";
import { Box } from "@material-ui/core";
import {
  datesAreOnSameDay,
  datesInSameWeek,
  datesAreIn30Days,
} from "../models/dumpster";

export const Map = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);

  const [dumpsters, setDumpsters] = useState<Dumpster[]>([]);
  const [filters, setFilters] = useState<MapFilters>();

  useEffect(() => {
    DataStore.query(Dumpster).then((d) => setDumpsters(d));
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  });

  const onLoad = useCallback((map: google.maps.Map) => {
    setBounds(new google.maps.LatLngBounds());
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (dumpsters && dumpsters.length && map && bounds) {
      dumpsters.forEach((d) => {
        if (d.latLng) {
          bounds.extend(d.latLng as any);
        }
      });
      map.fitBounds(bounds);
    }
  }, [bounds, dumpsters, map]);

  let filteredDumpsters = dumpsters;
  if (filters) {
    filteredDumpsters = dumpsters.filter((d) => {
      if (filters.type === "dropped" && !d.dateDropOff) {
        return false;
      }
      if (filters.type === "picked_up" && !d.datePickedUp) {
        return false;
      }

      if (filters.on === "today") {
        if (
          (d.datePickedUp &&
            datesAreOnSameDay(new Date(), new Date(d.datePickedUp))) ||
          (d.dateDropOff &&
            datesAreOnSameDay(new Date(), new Date(d.dateDropOff)))
        ) {
          return true;
        } else {
          return false;
        }
      }

      if (filters.on === "week") {
        if (
          (d.datePickedUp &&
            datesInSameWeek(new Date(), new Date(d.datePickedUp))) ||
          (d.dateDropOff &&
            datesInSameWeek(new Date(), new Date(d.dateDropOff)))
        ) {
          return true;
        } else {
          return false;
        }
      }

      if (filters.on === "month") {
        if (
          (d.datePickedUp &&
            datesAreIn30Days(new Date(), new Date(d.datePickedUp))) ||
          (d.dateDropOff &&
            datesAreIn30Days(new Date(), new Date(d.dateDropOff)))
        ) {
          return true;
        } else {
          return false;
        }
      }

      if (filters.at) {
        if (
          (d.datePickedUp &&
            datesAreOnSameDay(
              new Date(`${filters.at} 00:00:00`),
              new Date(d.datePickedUp)
            )) ||
          (d.dateDropOff &&
            datesAreOnSameDay(
              new Date(`${filters.at} 00:00:00`),
              new Date(d.dateDropOff)
            ))
        ) {
          return true;
        } else {
          return false;
        }
      }

      return true;
    });
  }

  return (
    <Card>
      <Title title="Map" />
      <CardContent>
        {isLoaded ? (
          <div style={{ textAlign: "center" }}>
            <PostFilterForm setFilters={setFilters} />
            <GoogleMap
              mapContainerStyle={{
                width: "100%",
                maxWidth: "500px",
                height: "400px",
                margin: "0 auto",
              }}
              zoom={14}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >
              {filteredDumpsters.map((dumpster) => (
                <Marker
                  position={dumpster!.latLng as any}
                  draggable={false}
                  onClick={() =>
                    window.open(
                      `${window.location.origin}/Dumpsters/${dumpster.id}/show`,
                      "_blank"
                    )
                  }
                />
              ))}
            </GoogleMap>
          </div>
        ) : (
          <Box textAlign="center">
            <CachedIcon />
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
