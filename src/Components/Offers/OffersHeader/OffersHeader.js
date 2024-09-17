import React, { useState, useEffect } from "react";
import { useDarkMode } from "../DarkModeContext";
import "./OffersHeader.scss";
import { Button, IconButton, TextField, Autocomplete } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import FilterOptions from "./FilterOptions/FilterOptions";
import { provinces } from "./provinces";

const OffersHeader = ({ onSearch, setOffers }) => {
  const [provinceId, setProvinceId] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOptionsOpen, setIsFilterOptionsOpen] = useState(false);

  const isSmallScreen = window.innerWidth <= 1500;
  const { isDarkMode } = useDarkMode();

  const searchQueryRef = React.createRef(); 
  const provinceIdRef = React.createRef();

  const handleSearch = () => {
    const province = provinces.find((province) => province.id === provinceId);
    const provinceName = province ? province.name : "";

    const apiUrl = `http://localhost:3000/api/offers/search?query=${searchQuery}&province=${provinceName}`;
    
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          return response.json();
        }
      })
      .then((data) => {
        if (data.jobs) {
          const filteredOffers = data.jobs.filter((offer) => {
            return offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                   offer.description.toLowerCase().includes(searchQuery.toLowerCase());
          });
          onSearch(filteredOffers);
        } else {
          console.error("No jobs found in API response");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleOpenFilterOptions = () => {
    setIsFilterOptionsOpen(true); 
  };

  const handleCloseFilterOptions = () => {
    setIsFilterOptionsOpen(false); 
  };

  return (
    <div className={`offers-header ${isDarkMode ? "dark-mode" : ""}`}>
      <div className="search-filter">
          <div className={`search-container ${isDarkMode ? "dark-mode" : ""}`}>
          <TextField
            type="text"
            placeholder="Search"
            size="small"
            className={`search-input ${isDarkMode ? "dark-mode" : ""}`}
            InputProps={{
              className: "search-input-label",
            }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            ref={searchQueryRef}
          />

          <Autocomplete
            id="province-input"
            className={`autocomplete-province ${isDarkMode ? "dark-mode" : ""}`}
            options={provinces}
            getOptionLabel={(option) => option.name}
            value={provinces.find((province) => province.id === provinceId) || null}
            onChange={(e, newValue) => setProvinceId(newValue?.id || "")}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                label="Voivodeship"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  classes: {
                    root: isDarkMode ? "autocomplete-province-label-dark" : "autocomplete-province-label-light",
                  },
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                ref={provinceIdRef}
              />
            )}
          />
            <Button
              onClick={handleSearch}
              variant="outlined"
              className={`search-button ${isDarkMode ? "dark-mode" : ""}`}
            >
              <SearchIcon />
            </Button>
          </div>
        <IconButton
          onClick={handleOpenFilterOptions}
          className={`tune-button ${isDarkMode ? "dark-mode" : ""} ${isSmallScreen ? "small-screen" : ""}`}
          variant="outlined"
        >
          <TuneIcon className="tune-button-icon" />
          {!isSmallScreen && <span className="tune-button-label">More Filters</span>}
        </IconButton>
      </div>
      <FilterOptions onClose={handleCloseFilterOptions} isSmallScreen={isSmallScreen} isDarkMode={isDarkMode} open={isFilterOptionsOpen} />
    </div>
  );
};

export default OffersHeader;
