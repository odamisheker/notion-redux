import { Link, Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { logOutUser } from "../redux/user/actions";

export default function Layout() {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOutUser());
    localStorage.clear();
  };

  return (
    <div>
      <AppBar position="static" style={{ background: "grey" }}>
        <Toolbar>
          <Link
            onClick={handleLogOut}
            to="/"
            style={{
              marginLeft: "auto",
              color: "white",
              textDecoration: "none",
            }}
          >
            <Typography variant="h6">Log out</Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};