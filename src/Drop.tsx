import React, { useState, useCallback, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import { Marker } from "@react-google-maps/api";
import { DataStore } from "@aws-amplify/datastore";
import { Dumpster } from "./models";
import { useParams } from "react-router-dom";

const containerStyle = {
  width: "400px",
  height: "400px",
  margin: "0 auto",
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  });
  const formRef = useRef<HTMLFormElement>(null);

  let { id } = useParams();
  const [location, setLocation] = useState<google.maps.LatLng | null>(null);
  const [map, setMap] = useState(null);
  const [dumpster, setDumpster] = useState<Dumpster>();

  useEffect(() => {
    DataStore.query(Dumpster, id!).then((d) => setDumpster(d));
  }, []);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const drop = async () => {
    const geocoder = new google.maps.Geocoder();

    const response = await geocoder.geocode({ location });

    const streetAddress = response.results.find((r) =>
      r.types.includes("street_address")
    );

    const name =
      streetAddress?.address_components.find((a) =>
        a.types.includes("street_number")
      )?.short_name +
      " " +
      streetAddress?.address_components.find((a) => a.types.includes("route"))
        ?.short_name;

    console.log(response);

    const dumpster = await DataStore.save(
      new Dumpster({
        name,
        location: streetAddress?.formatted_address,
        dateDropOff: new Date().toISOString(),
      })
    ).catch((e) => console.error(e));

    console.log("dumpster", dumpster);
  };

  const onDragEnd = (e: google.maps.MapMouseEvent) => {
    setLocation(e.latLng);
  };

  return isLoaded && dumpster ? (
    <div style={{ textAlign: "center" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={dumpster!.latLng as any}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
          position={dumpster!.latLng as any}
          onDragEnd={onDragEnd}
          draggable={false}
        />
      </GoogleMap>

      <h3 style={{ color: "white" }}>{dumpster!.location}</h3>
      <button
        disabled={!!dumpster.dateDropOff}
        className="button"
        onClick={drop}
      >
        Drop
      </button>

      <form
        style={{ marginTop: "20px" }}
        action="http://maps.google.com/maps"
        method="get"
        target="_blank"
        ref={formRef}
      >
        <input type="hidden" name="daddr" value={dumpster!.location} />

        <button type="submit" className="button">
          Get directions
        </button>
      </form>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
