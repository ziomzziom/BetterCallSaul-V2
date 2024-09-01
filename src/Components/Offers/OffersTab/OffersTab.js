import React, { useEffect, useState, useCallback, useLayoutEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { useDarkMode } from "../DarkModeContext";
import OfferItemLargeScreen from "../OfferItem/OfferItemLargeScreen";
import OfferItemSmallScreen from "../OfferItem/OfferItemSmallScreen";
import notfound from "../../Static/undraw_empty_re_opql.svg";
import outofoffers from "../../Static/undraw_note_list_re_r4u9.svg";
import { Skeleton } from "@mui/material";
import "./OffersTab.scss";

const OffersTab = ({ offers, noResults }) => {
  const [localOffers, setLocalOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("all");
  const { isDarkMode } = useDarkMode();
  const isSmallScreen = useMediaQuery({ query: "(max-width: 960px)" });
  const [isMuiBoxMapVisible, setMuiBoxMapVisible] = useState(true);

  const fetchOffers = useCallback(() => {
    const statusFilter = activeTab === "available" ? 1 : null;

    fetch(`https://lawyerappwebapi.azurewebsites.net/api/Jobs/GetJobs?pagesize=10&status=${statusFilter}`)
      .then((response) => response.json())
      .then((data) => {
        setLocalOffers(data.jobs);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Error fetching data");
        setLoading(false);
      });
  }, [activeTab]);

  useEffect(() => {
    setLocalOffers([]);
    setLoading(true);
    fetchOffers();
  }, [fetchOffers]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useLayoutEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight;

      console.log("Scrolled to bottom:", scrolledToBottom);

      setMuiBoxMapVisible(!scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [setMuiBoxMapVisible]);
  

  return (
    <div className="OffersTab">
      <div className={`offer-list-tab ${isDarkMode ? "dark-mode" : ""}`}>
        <button
          className={`offer-list-tab-button ${activeTab === "available" ? "active" : ""} ${isDarkMode ? "dark-mode" : ""}`}
          onClick={() => handleTabClick("available")}
        >
          Available Offers
        </button>
        <button
          className={`offer-list-tab-button ${activeTab === "all" ? "active" : ""} ${isDarkMode ? "dark-mode" : ""}`}
          onClick={() => handleTabClick("all")}
        >
          All Offers
        </button>
      </div>
      <div className="offer-list-wrapper">
        {loading ? (
          <div className={`offer-list ${isDarkMode ? "dark-mode" : ""}`}>
            <div className="invisible-text">Search results:</div>
            {[...Array(9)].map((_, index) => (
              <div className={`offer-item-skeleton-wrapper ${isDarkMode ? "dark-mode" : ""}`} style={{ display: 'flex', flexDirection: 'row' }}>
                <Skeleton variant="circular" width={70} height={70} sx={{ marginBottom: '16px', marginRight: '20px' }} />
                <div style={{ display: 'flex', flexDirection: 'column', marginRight: '12px' }}>
                  <Skeleton variant="text" width={650} height={35} />
                  <Skeleton variant="text" width={650} height={35} />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className={`offer-list ${isDarkMode ? "dark-mode" : ""}`}>
            <div className="invisible-text">Search results:</div>
            {noResults ? (
              <div className={`offer-list-noresult ${isDarkMode ? "dark-mode" : ""}`}>
                <div className="offer-list-noresult-center-content">
                  <p>Sorry, <br />We did not find any offers for this search criteria.</p>
                  <img src={notfound} alt="success_login" style={{ height: '250px' }} />
                </div>
              </div>
            ) : (
              localOffers.map((offer) => (
                isSmallScreen ? (
                  <OfferItemSmallScreen
                    key={offer.id}
                    offer={offer}
                  />
                ) : (
                  <OfferItemLargeScreen
                    key={offer.id}
                    offer={offer}
                  />
                )
              ))
            )}
            <div className={`offer-list-end ${isDarkMode ? "dark-mode" : ""}`}>
              <span className={`offer-list-end-text ${isDarkMode ? "dark-mode" : ""}`}>Oops! <br/>
                It seems we've run out of offers.<br/>
                Check back later for more opportunities!
              </span>
              <img src={outofoffers} alt="out of offers" style={{ height: '150px' }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersTab;
