/* eslint-disable no-unused-vars */
import { useState } from "react";

import { DataGrid } from "@mui/x-data-grid";
import { useUserContext } from "../context/user_context";
import advancedFormat from "dayjs/plugin/advancedFormat";
import day from "dayjs";
import styled from "styled-components";
day.extend(advancedFormat);

const userColumns = [
  { field: "id", headerName: "ID", width: 250 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img} alt="avatar" />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  {
    field: "verified",
    headerName: "Verified",
    width: 290,
    renderCell: (params) => {
      const date = day(params.row.verified).format("hh:mm a - MMM Do, YYYY ");
      return (
        <div className={`cellWithStatus ${params.row.verified}`}>{date}</div>
      );
    },
  },
];

const DbUser = () => {
  const { listUser } = useUserContext();

  const [data, setData] = useState(listUser);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div className="viewButton">View</div>
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
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        hideFooterPagination={true}
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

export default DbUser;
