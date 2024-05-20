import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

import advancedFormat from "dayjs/plugin/advancedFormat";
import day from "dayjs";
import styled from "styled-components";
import { useProductsContext } from "../context/products_context";
import { formatPrice } from "../utils/helpers";
import { customFetch } from "../utils/axios";
import AddProduct from "../components/AddProduct";
day.extend(advancedFormat);

const userColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "image",
    headerName: "Image",
    width: 120,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.image[0]} alt="avatar" />
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    width: 180,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.name}`}>
          {params.row.name}
        </div>
      );
    },
  },

  {
    field: "price",
    headerName: "Price",
    width: 150,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.price}`}>
          {formatPrice(params.row.price)}
        </div>
      );
    },
  },
  {
    field: "company",
    headerName: "Company",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "CreatedAt",
    width: 210,
    renderCell: (params) => {
      const date = day(params.row.createdAt).format("hh:mm a - MMM Do, YYYY ");
      return (
        <div className={`cellWithStatus ${params.row.createdAt}`}>{date}</div>
      );
    },
  },
];

const DbProduct = () => {
  const {
    fetchProducts,
    products,
    isAddProductOpen,
    openAddProduct,
    deleteProduct,
  } = useProductsContext();
  const [data, setData] = useState(products);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    deleteProduct(id);
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
              <div className="viewButton">Update</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    fetchProducts(customFetch);
  }, []);

  return (
    <>
      <Wrapper className="datatable">
        <div className="datatableTitle">
          Add New Product
          <p onClick={openAddProduct} className="link">
            Add New
          </p>
        </div>
        <DataGrid
          className="datagrid"
          rows={data}
          columns={userColumns.concat(actionColumn)}
          pageSize={6}
          rowsPerPageOptions={[6]}
          checkboxSelection
          hideFooterPagination={true}
          disableVirtualization={true}
          // autoHeight={true}
        />
      </Wrapper>
      {isAddProductOpen ? <AddProduct /> : null}
    </>
  );
};

const Wrapper = styled.div`
  height: 600px;
  padding: 20px;

  .datatableTitle {
    width: 100%;
    font-size: 24px;
    color: gray;
    margin-bottom: 5px;
    margin-top: -5px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    .link {
      text-decoration: none;
      color: #ab7a5f;
      font-size: 16px;
      font-weight: 400;
      border: 1px solid #ab7a5f;
      padding: 5px;
      border-radius: 5px;
      cursor: pointer;
    }
  }

  .cellWithImg {
    display: flex;
    align-items: center;

    .cellImg {
      width: 60px;
      height: 46px;
      border-radius: 10%;
      object-fit: cover;
      margin-right: 20px;
      margin-top: 2px;
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

export default DbProduct;
