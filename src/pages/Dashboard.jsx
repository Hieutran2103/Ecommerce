import Widget from "../components/Widget";
import Chart from "../components/Chart";
import styled from "styled-components";
import { useOrderContext } from "../context/order_context";
import { useUserContext } from "../context/user_context";

const Dashboard = () => {
  const { amountUser } = useUserContext();
  const { totalOrders, earnings } = useOrderContext();
  return (
    <Wrapper>
      <div className="widgets">
        <Widget type="user" amount={amountUser} />
        <Widget type="order" amount={totalOrders} />
        <Widget type="earning" amount={earnings} />
      </div>
      <div className="charts">
        <Chart />
      </div>
      ;
    </Wrapper>
  );
};
const Wrapper = styled.div`
  .widgets,
  .charts {
    display: flex;
    padding: 20px;
    gap: 20px;
  }
  .charts {
    padding: 5px 20px;
    margin-top: 10px;
  }
`;

export default Dashboard;
