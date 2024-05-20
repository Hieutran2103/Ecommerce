import { useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import avaUser from "../assets/user.png";
import advancedFormat from "dayjs/plugin/advancedFormat";
import day from "dayjs";
import styled from "styled-components";
import { useOrderContext } from "../context/order_context";
import { formatPrice } from "../utils/helpers";
day.extend(advancedFormat);

const userColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={avaUser} alt="avatar" />
          {params.row.userName}
        </div>
      );
    },
  },
  {
    field: "prices",
    headerName: "Prices",
    width: 130,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.total}`}>
          {formatPrice(params.row.total)}
        </div>
      );
    },
  },
  {
    field: "products",
    headerName: "Products",
    width: 120,
    renderCell: (params) => {
      const totalSum = params.row.orderItems.reduce(
        (accumulator, currentOrder) => {
          return accumulator + currentOrder.amount;
        },
        0
      );
      return (
        <div className={`cellWithStatus ${params.row.total}`}>{totalSum}</div>
      );
    },
  },
  {
    field: "createdAt",
    headerName: "BuydatedAt",
    width: 250,
    renderCell: (params) => {
      const date = day(params.row.createdAt).format("hh:mm a - MMM Do, YYYY ");
      return (
        <div className={`cellWithStatus ${params.row.updatedAt}`}>{date}</div>
      );
    },
  },
];

const DbOrder = () => {
  const { orders } = useOrderContext();
  const [data, setData] = useState(orders);

  const handleDelete = (id) => {
    setData(data.filter((item) => item._id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <Wrapper className="datatable">
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        hideFooterPagination={true}
        getRowId={(row) => row._id} // Sử dụng trường `_id` làm `id` cho mỗi hàng
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 600px;
  padding: 20px;

  .datatableTitle {
    width: 100%;
    font-size: 24px;
    color: gray;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .link {
      text-decoration: none;
      color: green;
      font-size: 16px;
      font-weight: 400;
      border: 1px solid green;
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .cellWithImg {
    display: flex;
    align-items: center;

    .cellImg {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      object-fit: cover;
      margin-right: 20px;
    }
  }

  .cellWithStatus {
    padding: 5px;
    border-radius: 5px;

    &.active {
      background-color: rgba(0, 128, 0, 0.05);
      color: green;
    }
    &.pending {
      background-color: rgba(255, 217, 0, 0.05);
      color: goldenrod;
    }
    &.passive {
      background-color: rgba(255, 0, 0, 0.05);
      color: crimson;
    }
  }

  .cellAction {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 10px 0;
    .viewButton {
      border-radius: 5px;
      color: darkblue;
      border: 1px dotted rgba(0, 0, 139, 0.596);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      width: 50px;
    }

    .deleteButton {
      border-radius: 5px;
      color: crimson;
      border: 1px dotted rgba(220, 20, 60, 0.6);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 30px;
      width: 50px;
    }
  }
`;

export default DbOrder;
