import React, { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import { Marker } from "@react-google-maps/api";
import { DataStore } from "@aws-amplify/datastore";
import { Dumpster } from "./models";

const googleMapsApiKey = "AIzaSyAVDzrNj6jDQTj0-axpm7UK6hcQXQpZ5EY";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 30.336944,
  lng: -81.661389,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
  });

  const [location, setLocation] = useState<google.maps.LatLng | null>(null);
  const [map, setMap] = useState(null);

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
      ) +
      " " +
      streetAddress?.address_components.find((a) => a.types.includes("route"));

    console.log(response);

    const dumpster = await DataStore.save(
      new Dumpster({
        name,
        location: streetAddress?.formatted_address,
        dateDropOff: new Date().toISOString(),
      })
    );

    console.log("dumpster", dumpster);
  };

  const onDragEnd = (e: google.maps.MapMouseEvent) => {
    console.log("donDragEndd", e.latLng?.toUrlValue());
    setLocation(e.latLng);
  };

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker
          position={{
            lat: location?.lat() || 30.336944,
            lng: location?.lng() || -81.661389,
          }}
          onDragEnd={onDragEnd}
          draggable={true}
        />
      </GoogleMap>
      <button disabled={!location} className="btn btn-2" onClick={drop}>
        Drop
      </button>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
