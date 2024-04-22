import React from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

import { logout, reset } from "../features/AuthSlice";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import LogoutIcon from '@mui/icons-material/Logout';

import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, ListItemText, Menu, MenuItem } from "@mui/material";
const NavScroll = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const LogOutFunction = () => {
    localStorage.removeItem("CC_Token");
   
      navigate("/logout");
   
  };
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user } = useSelector((state) => state.auth);
  const mystyle = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
  };
  // ???????
  const { cartTotalQuantity } = useSelector((state) => state.storecart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-haspopup="true"
          color="error"
          onClick={() => {
            navigate("/cart");
          }}
        >
          <ShoppingCartIcon sx={{ fontSize: 40 }} />
          <Badge
            badgeContent={cartTotalQuantity > 0 ? cartTotalQuantity : 0}
            color="success"
          ></Badge>
        </IconButton>
        <Navbar.Brand href="#"> </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/articles">
              Articles
            </Nav.Link>
            <Nav.Link as={Link} to="/categories">
              Catégories
            </Nav.Link>
            <Nav.Link as={Link} to="/scategories">
              Sous Catégories
            </Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          <Stack direction="row" spacing={2}>
            <ListItem
              button
              id="lock-button"
              aria-haspopup="listbox"
              aria-controls="lock-menu"
              aria-label={<Avatar alt={user.firstname} src={user.avatar} />}
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickListItem}
            >
              <ListItemText
                primary={<Avatar alt={user.firstname} src={user.avatar} />}
                secondary={user.firstname}
              />
            </ListItem>
            <Menu
              id="lock-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "lock-button",
                role: "listbox",
              }}
            >
              <MenuItem onClick={() => {}}>
                <AccountCircleIcon />
                Profile
              </MenuItem>
              <MenuItem onClick={() => {}}>
                <SettingsApplicationsIcon />
                Settings
              </MenuItem>
              <MenuItem onClick={() => LogOutFunction()}>
                <LogoutIcon />
                Logout
              </MenuItem>
            </Menu>
          </Stack>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavScroll;
