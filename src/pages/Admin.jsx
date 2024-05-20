/* eslint-disable react-hooks/exhaustive-deps */
import styled from "styled-components";
import { useUserContext } from "../context/user_context";
import { useEffect } from "react";
import { useOrderContext } from "../context/order_context";
import SidebarAdmin from "../components/SidebarAmin";
import { Outlet } from "react-router-dom";

const Admin = () => {
  const { NumberUser } = useUserContext();
  const { fetchOrders, showData } = useOrderContext();

  useEffect(() => {
    NumberUser();
    fetchOrders();
    showData();
  }, []);

  return (
    <Wrapper className="page admin">
      <div className="home">
        <SidebarAdmin />
        <div className="homeContainer">
          <Outlet />
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .home {
    display: flex;
    .homeContainer {
      flex: 6;
    }
  }
`;
export default Admin;
