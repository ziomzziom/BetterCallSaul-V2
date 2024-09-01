import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";
import "./LeafletMap.scss";
import { useDarkMode } from "../DarkModeContext";

const LeafletMap = ({ offers }) => {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const addressMap = useRef(new Map());
  const zoomControlRef = useRef(null);

  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.off();
      mapRef.current.remove();
      markersRef.current = {};
    }

    try {
      const map = L.map("map", {
        zoomControl: false,
      }).setView([52.100264, 19.12], 6);
      mapRef.current = map;

      const addOrUpdateTileLayer = () => {
        const apiKey = "XgilIkWrWkSQFf0jdONa";
        const format = "png";

        let mapId = "streets-v2";
        if (isDarkMode) {
          mapId = "streets-v2-dark";
        }

        const tileLayerUrl = `https://api.maptiler.com/maps/${mapId}/{z}/{x}/{y}.${format}?key=${apiKey}`;

        L.tileLayer(tileLayerUrl, {
          tileSize: 512,
          maxZoom: 18,
          zoomOffset: -1,
        }).addTo(mapRef.current);
      };

      addOrUpdateTileLayer();

      zoomControlRef.current = L.control.zoom({
        position: 'topright'
      }).addTo(mapRef.current);

      if (Array.isArray(offers) && offers.length > 0) {
        const defaultMarkerIcon = L.icon({
          iconUrl: "https://upload.wikimedia.org/wikipedia/commons/8/88/Map_marker.svg",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          tooltipAnchor: [16, -28],
          shadowSize: [41, 41],
        });

        const clusterOptions = {
          disableClusteringAtZoom: 15,
          spiderfyOnMaxZoom: false,
          showCoverageOnHover: false,
        };

        const markers = L.markerClusterGroup(clusterOptions);

        offers.forEach((offer) => {
          const { id, address } = offer;
          if (address && address.city && address.street) {
            fetch(
              `https://nominatim.openstreetmap.org/search?city=${address.city}&street=${address.street}&format=json`
            )
              .then((response) => response.json())
              .then((data) => {
                if (data && data.length > 0) {
                  const { lat, lon } = data[0];
                  addressMap.current.set(id, { lat, lon }); // Store latitude and longitude
  
                  // Create marker and bind popup
                  const marker = L.marker([lat, lon], {
                    icon: defaultMarkerIcon,
                  });
                  marker.bindPopup(offer.title);
  
                  // Add marker to the cluster group
                  markers.addLayer(marker);
  
                  // Save marker to markersRef
                  markersRef.current[id] = marker;
                }
              })
              .catch((error) => {
                console.error("Error fetching location data:", error);
              });
          }
        });

        mapRef.current.addLayer(markers);
      }
    } catch (error) {
      console.error("Error initializing map:", error);
    }
  }, [offers, isDarkMode]);

  return (
    <div id="map" className={`leaflet-map ${isDarkMode ? "dark-mode" : ""}`}>
      <div
        id="map-container"
        className={`leaflet-map-container ${isDarkMode ? "dark-mode" : ""}`}
      ></div>
    </div>
  );
};

export default LeafletMap;
