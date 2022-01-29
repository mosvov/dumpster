import React, { useState, useCallback, useEffect, useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

import { Marker } from "@react-google-maps/api";
import { DataStore } from "@aws-amplify/datastore";
import { Dumpster } from "./models";
import { useParams } from "react-router-dom";
import { Hub } from "@aws-amplify/core";
import CachedIcon from "@material-ui/icons/Cached";

const containerStyle = {
  width: "100%",
  maxWidth: "500px",
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
  //const [location, setLocation] = useState<google.maps.LatLng | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [dumpster, setDumpster] = useState<Dumpster>();

  useEffect(() => {
    const removeListener = Hub.listen("datastore", async ({ payload }) => {
      if (payload.event === "ready") {
        console.log("DataStore ready");
        DataStore.query(Dumpster, id!)
          .then((d) => setDumpster(d))
          .then(setMapCenter)
          .catch((e) => console.error(e));
      }
    });

    DataStore.start();

    return () => removeListener();
  }, [id]);

  const setMapCenter = () => {
    if (!map || !dumpster) return;
    const bounds = new window.google.maps.LatLngBounds(
      dumpster!.latLng as any,
      dumpster!.latLng as any
    );
    map.fitBounds(bounds);
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    setMapCenter();

    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const drop = async () => {
    /*const geocoder = new google.maps.Geocoder();
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
        ?.short_name;*/

    if (!dumpster) return;

    await DataStore.save(
      Dumpster.copyOf(dumpster, (item) => {
        item.dateDropOff = new Date().toISOString();
      })
    )
      .then((d) => setDumpster(d))
      .catch((e) => console.error(e));
  };

  const pickUp = async () => {
    if (!dumpster) return;

    await DataStore.save(
      Dumpster.copyOf(dumpster, (item) => {
        item.datePickedUp = new Date().toISOString();
      })
    )
      .then((d) => setDumpster(d))
      .catch((e) => console.error(e));
  };

  const onDragEnd = (e: google.maps.MapMouseEvent) => {
    //setLocation(e.latLng);
  };

  console.log("dd", dumpster?.dateDropOff, dumpster?.datePickedUp);
  return isLoaded && dumpster ? (
    <div style={{ textAlign: "center" }}>
      {dumpster?.latLng && (
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
      )}
      <h3 style={{ color: "white" }}>{dumpster.location}</h3>
      <pre style={{ color: "white" }}>{dumpster.comments}</pre>
      <button
        style={{ marginRight: 10 }}
        disabled={!!dumpster.dateDropOff}
        className="button buttonRed"
        onClick={() => window.confirm("Are you sure?") && drop()}
      >
        Drop UP
      </button>

      <button
        disabled={!dumpster.dateDropOff || !!dumpster.datePickedUp}
        className="button"
        onClick={() => window.confirm("Are you sure?") && pickUp()}
      >
        Pick UP
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
    <>
      <CachedIcon />
    </>
  );
}

export default React.memo(MyComponent);
