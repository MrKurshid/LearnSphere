import React from "react";
import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";

import "./account.css";
import { userData } from "../../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Account = ({ user }) => {
  const { setisAuth, setUser } = userData();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setisAuth(false);
    toast.success("Logged Out");
    navigate("/login");
  };
  return (
    <div>
      {user && (
        <div className="profile">
          <h2>My Profile</h2>
          <div className="profile-info">
            <p>
              <strong>Name- {user.name}</strong>
            </p>
            <p>
              <strong>Email- {user.email}</strong>
            </p>
            <button className="common-btn">
              <MdDashboard /> Dashboard
            </button>
            <br />
            <button
              onClick={logoutHandler}
              className="common-btn"
              style={{ background: "red" }}
            >
              <IoMdLogOut /> LogOut
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
