import React, { useEffect, useRef } from "react";

import { createMap } from "maplibre-gl-js-amplify";
import "maplibre-gl/dist/maplibre-gl.css";
import { Map as MaplibreMap } from "maplibre-gl";
import { drawPoints } from "maplibre-gl-js-amplify";

const Map = () => {
  const mapRef = useRef(null); // Reference to the map DOM element

  // Wrapping our code in a useEffect allows us to run initializeMap after the div has been rendered into the DOM
  useEffect(() => {
    let map: MaplibreMap;
    async function initializeMap() {
      // We only want to initialize the underlying maplibre map after the div has been rendered
      if (mapRef.current != null) {
        map = await createMap({
          container: mapRef.current,

          center: [-81.661389, 30.336944],
          zoom: 10,
        });

        map.on("load", function () {
          drawPoints(
            "mySourceName", // Arbitrary source name
            [
              {
                coordinates: [-81.661389, 30.336944], // [Longitude, Latitude]
                title: "Golden Gate Bridge",
                address: "A suspension bridge spanning the Golden Gate",
              },
              {
                coordinates: [-81.661389, 30.336944], // [Longitude, Latitude]
              },
            ], // An array of coordinate data, an array of Feature data, or an array of [NamedLocations](https://github.com/aws-amplify/maplibre-gl-js-amplify/blob/main/src/types.ts#L8)
            map,
            {
              showCluster: true,
              unclusteredOptions: {
                showMarkerPopup: true,
              },
              clusterOptions: {
                showCount: true,
              },
            }
          );
        });
      }
    }
    initializeMap();

    // Cleans up and maplibre DOM elements and other resources - https://maplibre.org/maplibre-gl-js-docs/api/map/#map#remove
    return function cleanup() {
      if (map != null) map.remove();
    };
  }, []);

  return (
    <div ref={mapRef} id="map" style={{ width: "100%", height: "500px" }} />
  );
};

export default Map;
