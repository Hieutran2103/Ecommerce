import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useOrderContext } from "../context/order_context";

const Chart = () => {
  const { show } = useOrderContext();
  return (
    <div style={{ width: "100%" }}>
      <h4>The amount of money earned each day of the month</h4>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={show}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis dataKey="totalAmount" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="totalAmount"
            stroke="#f76db2"
            fill="#f76db2"
          />
        </AreaChart>
      </ResponsiveContainer>
      <p>Number of orders per day of the month</p>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={200}
          data={show}
          syncId="anyId"
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis dataKey="count" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="count"
            stroke="#9ba2ff"
            fill="#9ba2ff"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
