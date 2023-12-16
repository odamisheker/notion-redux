import React from "react";
import { connect } from "react-redux";
import { selectUserEmail, selectUserId } from "../redux/user/selectors";
import { Link } from "react-router-dom";

const Home = ({ email }) => {
  const formattedDate = new Date().toLocaleDateString();

  return (
    <div className="container prose mx-auto mt-8 p-4 bg-white rounded-md shadow-md text-center">
      <h1 className="text-3xl font-bold  text-black">Hello, {email}</h1>
      <h2>About me</h2>
      <p className="mb-3 text-gray-600">Registration Date: {formattedDate}</p>
      <Link
        to="/notes"
        className="text-blue-500 no-underline transition duration-300 ease-in-out"
      >
        Go to Notes
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => ({
  email: selectUserEmail(state),
});

export default connect(mapStateToProps)(Home);
