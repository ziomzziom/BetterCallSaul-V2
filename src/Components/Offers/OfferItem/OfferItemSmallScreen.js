import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../DarkModeContext";
import RoomOutlinedIcon from '@mui/icons-material/RoomOutlined';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import { Avatar } from "@mui/material";
import "./OfferItem.scss";

const formatDateToMonthDayYear = (dateString) => {
  const options = { month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleString(undefined, options);
};

const OfferItemSmallScreen = ({ offer }) => {
  const { isDarkMode } = useDarkMode();

  const formatTime = (timeString) => {
    if (!timeString) {
      return "";
    }
    const [hours, minutes] = timeString.split(":");
    return `${hours}:${minutes}`;
  };

  const isNew = (offer) => {
    const today = new Date();
    const creationDate = new Date(offer.createdDate);

    if (
      today.getFullYear() === creationDate.getFullYear() &&
      today.getMonth() === creationDate.getMonth() &&
      today.getDate() === creationDate.getDate()
    ) {
      return "NEW";
    }

    const timeDifference = Math.abs(today - creationDate);
    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return `${daysDifference}d temu`;
  };

  return (
    <Link
      to={`/offer-details/${offer.id}`}
      className={`offer-item ${isDarkMode ? "dark-mode" : ""}`}
    >
      <div className={`offer-item-isactive ${offer.status === 1 ? 'active' : 'inactive'}`}></div>
      <div className="offer-item-container">
        <div className="offer-item-avatar-container">
          <Avatar
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: isDarkMode ? 'var(--color-tag-background-light)' : 'var(--color-tag-background-dark)',
            }}
            className={`offer-item-avatar ${isDarkMode ? "dark-mode" : ""}`}
            size="large"
            alt="Avatar"
          >
            {offer.createdBy?.photo && (
              <img
                src={offer.createdBy.photo}
                alt={`${offer.createdBy.firstName || ''} ${offer.createdBy.lastName || ''}`}
                style={{ width: '100%', height: '100%', borderRadius: '50%' }}
              />
            )}
          </Avatar>
        </div>
        <div className="offer-item-content-container">
          <div className="offer-item-content-one">
            <div className="offer-item-details">
              <div className="offer-item-title-container" title={offer.title}>
                <div className={`offer-item-title ${isDarkMode ? "dark-mode" : ""}`}>{offer.title}</div>
              </div>
              <div className="offer-item-tag">
                <span className={`new tag ${isDarkMode ? "dark-mode" : ""}`}>{isNew(offer)}</span>
              </div>
            </div>
          </div>
          <div className="offer-item-content-two">
            <div className="offer-item-date-location-wrapper">
              <div className={`offer-item-date-wrapper ${isDarkMode ? "dark-mode" : ""}`}>
                <div className="icon-wrapper"><CalendarMonthIcon fontSize="small" /></div>
                <span className="date-value">{formatDateToMonthDayYear(offer.date)} <span className="date-time">{formatTime(offer.time)}</span></span>
              </div>
            </div>
            {offer.price && (
                <div className="offer-item-price">{offer.price} PLN</div>
              )}
            <div className="offer-item-location">
              <div className="location-marker-wrapper">
                <RoomOutlinedIcon />
              </div>
              <span>{offer.court.city}</span>
              {offer.vatInvoice && (
                <div className="offer-item-invoice-icon">
                  <RequestQuoteOutlinedIcon />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default OfferItemSmallScreen;
