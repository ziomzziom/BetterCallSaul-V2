import React, { useState } from "react";
import {
  IconButton,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  FormControlLabel,
  Switch,
  Typography,
  TextField
} from "@mui/material";

import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import RequestQuoteOutlinedIcon from "@mui/icons-material/RequestQuoteOutlined";
import SpecialitySection from "./SpecialitySection";
import PriceRangeFilter from "./PriceRangeFilter";
import "./FilterOptions.scss";

const FilterOptions = ({ onClose, isSmallScreen, isDarkMode, open }) => {
  const [specialities, setSpecialities] = useState([]);
  const [applicationDeadline, setApplicationDeadline] = useState("");
  const [isInvoiceRequired, setIsInvoiceRequired] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  const handleApplyFilter = () => {
    onClose();
  };
  
  const handleResetFilter = () => {
    setSpecialities([]);
    setApplicationDeadline("");
    setIsInvoiceRequired(false);
    setPriceRange([0, 1000]);
  };
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isSmallScreen}
      className={"filter-options"}
      PaperProps={{
        style: {
          borderRadius: 20,
          backgroundColor: "black",
        },
      }}
    >
        <div className={`filter-header ${isDarkMode ? "dark-mode" : ""}`}>
          <h2>Filtrowanie</h2>
          <IconButton onClick={onClose} className={`filter-close-button ${isDarkMode ? "dark-mode" : ""}`}>
            <CloseIcon />
          </IconButton>
        </div>
      <DialogContent className={`filter-content ${isDarkMode ? "dark-mode" : ""}`}>
        <div>
          <PriceRangeFilter isDarkMode={isDarkMode} value={priceRange} onChange={setPriceRange} />
          <TextField
            label="Wybierz Termin"
            type="date"
            value={applicationDeadline}
            onChange={(e) => setApplicationDeadline(e.target.value)}
            className={`filter-content-input ${isDarkMode ? "dark-mode" : ""}`}
            InputLabelProps={{
              shrink: true,
              classes: {
                root: isDarkMode ? "filter-content-date-input-label-dark" : "filter-content-date-input-label-light",
              },
            }}
            margin="normal"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="invoice-switch">
          <FormControlLabel
            className="invoice-switch-label"
            control={
              <Switch
                inputProps={{ "aria-label": "controlled" }}
                checked={isInvoiceRequired}
                onChange={() => setIsInvoiceRequired(!isInvoiceRequired)}
              />
            }
            label={
              <Typography variant="body1" style={{ fontWeight: "bold", letterSpacing: "1px" }}>
                Faktura VAT
              </Typography>
            }
          />
          <RequestQuoteOutlinedIcon />
        </div>
        
        <div className={`specialitysection-wrapper ${isDarkMode ? "dark-mode" : ""}`}>
          <span className={`filter-content-spantext ${isDarkMode ? "dark-mode" : ""}`}>Speciality</span>
          <SpecialitySection isDarkMode={isDarkMode} specialities={specialities} setSpecialities={setSpecialities} />
        </div>
      </DialogContent>
      <DialogActions className={`filter-footer ${isDarkMode ? "dark-mode" : ""}`}>
        <Button variant="contained" color="success" className="filter-button" startIcon={<DoneIcon />} onClick={handleApplyFilter}>
          Apply
        </Button>
        <Button variant="contained" color="warning" className="filter-button" startIcon={<DeleteIcon />} onClick={handleResetFilter}>
          Reset
        </Button>
        <Button variant="contained" color="error" onClick={onClose} startIcon={<CloseIcon />} className="filter-button">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FilterOptions;
