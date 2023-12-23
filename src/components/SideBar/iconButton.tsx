
import { styled } from "@mui/material";
import IconButtonMui from "@mui/material/IconButton";

const IconButton = styled(IconButtonMui)(({ theme }) => ({
  color: "#5F656B",
  "&:hover": {
    background: theme.palette.mode === "dark" ? "#202020" : "#F3F6F8",
  },
}));

export default IconButton;
