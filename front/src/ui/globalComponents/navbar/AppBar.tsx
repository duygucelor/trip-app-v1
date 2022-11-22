import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Logo from "../../assets/logo.png";
import { useAppDispatch, useAppSelector } from "../../../store";
import { currentUserSelector } from "../../../core/authorization/useCases/currentUser";
import { IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import {
  reset,
  signOut,
  statusSelector,
} from "../../../core/authorization/useCases/signOut";
import { PublicRoutesPaths } from "../../routes/publicRoutes";
import { useNavigate } from "react-router-dom";
import {
  PrivateRoutesNames,
  PrivateRoutesPaths,
} from "../../routes/privateRoutes";

const pages = [
  {
    title: "Home",
    name: PrivateRoutesNames.home,
    path: PrivateRoutesPaths.home,
  },
  {
    title: "Add your trip",
    name: PrivateRoutesNames.addTrip,
    path: PrivateRoutesPaths.addTrip,
  },
];
const settings = [{ name: "signOut", label: "Sign Out" }];
const commonStyles = {
  bgcolor: "background.paper",
  borderColor: "text.primary",
  m: 1,
  border: 1,
  width: "3rem",
  height: "3rem",
};

function Navbar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentUser = useAppSelector(currentUserSelector);
  const status = useAppSelector(statusSelector);

  React.useEffect(() => {
    if (status === "SUCCESS") {
      navigate(PublicRoutesPaths.signIn);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = () => {
    dispatch(signOut()).then(() => {
      navigate(PublicRoutesPaths.signIn);
      dispatch(reset());
    });
  };

  const handleClick = (setting: string) => {
    if (setting === "signOut") {
      handleSignOut();
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ width: 45 }} component="img" src={Logo} alt="logo" />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ ml: 5, flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{
                  mx: 5,
                  my: 2,
                  color: "white",
                  display: "block",
                  textTransform: "none",
                }}
                href={page.path}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Box
                sx={{
                  ...commonStyles,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {currentUser?.attributes.given_name[0]}
                {currentUser?.attributes.family_name[0]}
              </Box>
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => handleClick(setting.name)}
                >
                  <Typography textAlign="center">{setting.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
