import { AppBar, Box } from "@mui/material";
import Logo from "./Logo";

const Header = () => {
  return (
    <AppBar elevation={0} position="static" color="transparent">
      <Box display="flex" justifyContent="center" alignItems="center">
        <Logo />
      </Box>
    </AppBar>
  );
};

export default Header;
