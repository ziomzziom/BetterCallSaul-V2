import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Switch from "@mui/material/Switch";
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import TextareaAutosize from "@mui/material/TextareaAutosize";
import FormControlLabel from "@mui/material/FormControlLabel";
import "./CreateOrderForm.scss";

const CreateOrderDialog = ({ isDarkMode, open, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [invoiceRequired, setInvoiceRequired] = useState(false);
  const [category, setCategory] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [phone, setPhone] = useState(""); 
  const [address, setAddress] = useState({
    street: "",
    city: "",
    postalCode: "",
    province: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderPayload = {
      title,
      description,
      date,
      vatInvoice: invoiceRequired,
      proffesionTypes: [1], // default value
      email,
      phone,
      nameOrCompany: "", // add a field for this
      address: {
        street: address.street,
        city: address.city,
        postalCode: address.postalCode,
        province: address.province,
        simcId: 0,
      },
    };

    // Add API logic to send to API

    setTitle("");
    setDescription("");
    setDate("");
    setInvoiceRequired(false);
    setCategory("");
    setEmail("");
    setPhone("");
    setAddress({
      street: "",
      city: "",
      postalCode: "",
      province: "",
    });

    onClose(); 
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          borderRadius: 20,
        },
      }}
    >
      <DialogTitle>Create New Offer</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="create-order-form-input">
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              value={title}
              size="small"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="create-order-form-input">
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              value={category}
              size="small"
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="create-order-form-input">
            <TextField
              label="Date"
              type="date"
              variant="outlined"
              fullWidth
              value={date}
              size="small"
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>

          <div className={`create-order-form-invoice ${isDarkMode ? "dark-mode" : ""}`}>
            <FormControlLabel
              control={
                <Switch
                  checked={invoiceRequired}
                  onChange={(e) => setInvoiceRequired(e.target.checked)}
                  color="primary"
                />
              }
              label="VAT Invoice"
            />
            <RequestQuoteOutlinedIcon />
          </div>

          <div className="create-order-form-input">
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              size="small"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="create-order-form-input">
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              value={phone}
              size="small"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <TextareaAutosize
              placeholder="Description"
              minRows={4}
              size="large"
              value={description}
              className={`create-order-form textarea ${isDarkMode ? "dark-mode" : ""}`}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Address Fields */}
          <div className="create-order-form-input">
            <TextField
              label="Street"
              variant="outlined"
              fullWidth
              value={address.street}
              size="small"
              onChange={(e) => setAddress({ ...address, street: e.target.value })}
            />
          </div>

          <div className="create-order-form-input">
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              value={address.city}
              size="small"
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
            />
          </div>

          <div className="create-order-form-input">
            <TextField
              label="Postal Code"
              variant="outlined"
              fullWidth
              value={address.postalCode}
              size="small"
              onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
            />
          </div>

          <div className="create-order-form-input">
            <TextField
              label="Province"
              variant="outlined"
              fullWidth
              value={address.province}
              size="small"
              onChange={(e) => setAddress({ ...address, province: e.target.value })}
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" color="success" type="submit" onClick={handleSubmit}>
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateOrderDialog;
