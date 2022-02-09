import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Title } from "react-admin";
import { DataStore } from "@aws-amplify/datastore";
import { Dumpster } from "../models";

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import CachedIcon from "@material-ui/icons/Cached";
import { PostFilterForm } from "./mapFilters";

export const Map = () => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [bounds, setBounds] = useState<google.maps.LatLngBounds | null>(null);

  const [dumpsters, setDumpsters] = useState<Dumpster[]>([]);

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

  return (
    <Card>
      <Title title="Calendar" />
      <CardContent>
        {isLoaded ? (
          <div style={{ textAlign: "center" }}>
            <PostFilterForm />
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
              {dumpsters.map((dumpster) => (
                <Marker position={dumpster!.latLng as any} draggable={false} />
              ))}
            </GoogleMap>
          </div>
        ) : (
          <>
            <CachedIcon />
          </>
        )}
      </CardContent>
    </Card>
  );
};
