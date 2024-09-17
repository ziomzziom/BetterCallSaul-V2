import React, { useEffect, useState, Suspense, useCallback } from "react";

import LeafletMap from "../../Components/Offers/Leaflet/LeafletMap";
import Header from "../../Components/Header/Header";
import OffersTab from "../../Components/Offers/OffersTab/OffersTab";
import OffersHeader from "../../Components/Offers/OffersHeader/OffersHeader";

import { useDarkMode } from "../../Components/Offers/DarkModeContext";
import { useMediaQuery, useTheme } from "@mui/material";

import LoadingBox from "../../Components/Utils/Loading/LoadingBox";

import MuiBoxMap from "./PhoneButtons/MuiBoxMap";
import MapCancelButton from "./PhoneButtons/MapCancelButton";
import "./Orders.scss";

const useFetchData = () => {
  const [offers, setOffers] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState(null);

  const fetchData = useCallback(() => {
    setStatus("loading");
    fetch("http://localhost:3000/api/offers")
      .then((response) => response.json())
      .then((data) => {
        setOffers(data);
        setStatus("success");
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setStatus("error");
        setError(error.message);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { offers, setOffers, status, error, fetchData };
};

const Orders = () => {
  const { offers, setOffers, status, error } = useFetchData();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showMap, setShowMap] = useState(false);
  const { isDarkMode } = useDarkMode();
  const [noResults, setNoResults] = useState(false);
  const [isMuiBoxMapVisible, setIsMuiBoxMapVisible] = useState(true);

  const handleSearch = (searchQuery, provinceId) => {
    const apiUrl = `http://localhost:3000/api/offers/search?searchQuery=${searchQuery}&province=${provinceId}`;
  
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.jobs.length === 0) {
          setNoResults(true); 
        } else {
          setNoResults(false);
        }
        setOffers(data.jobs);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleMapButtonClick = () => {
    setShowMap(true);
  };

  const handleMapCancelButtonClick = () => {
    setShowMap(false);
  };

  useEffect(() => {
    // Scroll to the end of the container
    const container = document.getElementById("yourContainerId"); // Replace with the actual container id
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [offers]);

  return (
    <>
      <Header activeTab={0} isSmallScreen={isSmallScreen} />
      <OffersHeader onSearch={handleSearch} setOffers={setOffers} />
      <div className={`container ${isDarkMode ? "dark-mode" : ""}`} id="yourContainerId">
        {isMuiBoxMapVisible && (
          <MuiBoxMap onClick={handleMapButtonClick} isVisible={true} />
        )}

        {status === "loading" ? (
          <div className={`loading-container ${isDarkMode ? "dark-mode" : ""}`}>
            <LoadingBox height="100" />
          </div>
        ) : status === "success" ? (
          <>
            <div className="left-container">
              {showMap && isSmallScreen ? (
                <Suspense fallback={<div>Loading map...</div>}>
                  <LeafletMap offers={offers} showMap={showMap} />
                </Suspense>
              ) : (
                <OffersTab
                  offers={offers}
                  noResults={noResults}
                />
              )}
            </div>
            {!isSmallScreen && (
              <div className={`right-container ${isDarkMode ? "dark-mode" : ""}`}>
                <Suspense fallback={<div>Loading map...</div>}>
                  <LeafletMap offers={offers} />
                </Suspense>
              </div>
            )}
            {isSmallScreen && showMap && (
              <div className="map-cancel-wrapper">
                <MapCancelButton
                  className="map-cancel-icon"
                  onCancel={handleMapCancelButtonClick}
                  isDarkMode={isDarkMode}
                />
              </div>
            )}
          </>
        ) : (
          <div className="error-message">{error}</div>
        )}
      </div>
    </>
  );
};

export default Orders;
