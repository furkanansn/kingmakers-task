import { Box } from "@mui/material";

import Image from "next/image";

const Logo = () => {
  return (
    <Box
      component="div"
      sx={{
        width: 300,
        height: 100,
        "& img": {
          maxWidth: "200px",
          height: "auto",
          textAlign: "center",
        },
      }}
    >
      <Image alt="Kingmakers Logo" src="/logo.png" height={200} width={200} />
    </Box>
  );
};

export default Logo;
