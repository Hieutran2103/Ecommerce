import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";

import { Link } from "react-router-dom";
import styled from "styled-components";

const SidebarAdmin = () => {
  return (
    <Wrapper className="sidebar">
      <div className="center">
        <ul>
          <Link to="/admin" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/admin/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/admin/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
          <Link to="/admin/orders" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Orders</span>
            </li>
          </Link>
        </ul>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  flex: 1;
  border-right: 0.5px solid rgb(230, 227, 227);
  min-height: 100vh;

  .center {
    padding-left: 10px;

    ul {
      list-style: none;
      margin: 0;
      padding: 0;

      .title {
        font-size: 10px;
        font-weight: bold;
        color: #999;
        margin-top: 15px;
        margin-bottom: 5px;
      }

      li {
        margin-top: 20px;
        display: flex;
        align-items: center;
        padding: 5px;
        cursor: pointer;

        &:hover {
          background-color: #eaded7;
        }

        .icon {
          font-size: 18px;
          color: #ab7a5f;
        }

        span {
          font-size: 13px;
          font-weight: 600;
          color: #888;
          margin-left: 10px;
        }
      }
    }
  }

  .bottom {
    display: flex;
    align-items: center;
    margin: 10px;

    .colorOption {
      width: 20px;
      height: 20px;
      border-radius: 5px;
      border: 1px solid #7451f8;
      cursor: pointer;
      margin: 5px;

      &:nth-child(1) {
        background-color: whitesmoke;
      }
      &:nth-child(2) {
        background-color: #333;
      }
      &:nth-child(3) {
        background-color: darkblue;
      }
    }
  }
`;

export default SidebarAdmin;
