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
  const { offers, setOffers, status, error, fetchData } = useFetchData();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [showMap, setShowMap] = useState(false);
  const { isDarkMode } = useDarkMode();
  const [noResults, setNoResults] = useState(false);
  const [isMuiBoxMapVisible, setIsMuiBoxMapVisible] = useState(true);

  const handleSearch = (searchQuery, provinceName) => {
    if (!searchQuery && !provinceName) {
      setNoResults(true);
      setOffers([]);
      return;
    }
  
    let apiUrl = `http://localhost:3000/api/offers/search`;
  
    if (provinceName) {
      apiUrl += `?province=${provinceName}`;
    }
  
    if (searchQuery) {
      apiUrl += `${provinceName ? '&' : '?'}query=${searchQuery}`;
    }
  
    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.statusText);
        }
      })
      .then((data) => {
        setOffers(data);
        setNoResults(data.length === 0);
      })
      .catch((error) => {
        console.error(error);
        alert('An error occurred while fetching data');
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
      <OffersHeader onSearch={handleSearch} fetchData={fetchData} />
      <div className={`container ${isDarkMode ? "dark-mode" : ""}`} id="yourContainerId">
        <MuiBoxMap onClick={handleMapButtonClick} isVisible={true} />

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
