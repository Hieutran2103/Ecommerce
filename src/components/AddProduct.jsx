import { useState } from "react";
import styled from "styled-components";
import { useProductsContext } from "../context/products_context";
import uploadImage from "../assets/image.svg";
import { getUniqueValues } from "../utils/helpers";
import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import Textarea from "@mui/joy/Textarea";
import { InputImage } from "./InputAdd";
import { customFetch } from "../utils/axios";
import { FaTimes } from "react-icons/fa";

const AddProduct = () => {
  const { closeAddProduct, products, create_loading, createProduct } =
    useProductsContext();

  const categories = getUniqueValues(products, "category").slice(1);
  const companies = getUniqueValues(products, "company").slice(1);
  const colorss = getUniqueValues(products, "colors").slice(1);

  const initialState = {
    name: "",
    price: "",
    image: [],
    colors: [],
    company: "",
    description: "",
    category: "",
  };

  const [product, setProduct] = useState(initialState);
  const [file, setFile] = useState();

  const handleImg = (e) => {
    setFile(e.target.files);
  };

  const UpLoadImg = async () => {
    try {
      const formData = new FormData();
      for (let i = 0; i < file.length; i++) {
        formData.append("image", file[i]);
      }
      const res = await customFetch.post("/products/uploadImage", formData);
      return res.data.image;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, price, colors, company, description, category } = product;
    let imgUrl = "";
    if (file) {
      imgUrl = await UpLoadImg();
    }
    createProduct({
      name,
      price,
      image: imgUrl,
      colors,
      company,
      description,
      category,
    });
    setProduct(initialState);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct({ ...product, [name]: value });
  };

  const select = (event) => {
    const name = event.target.getAttribute("name");
    const value = event.target.innerText;
    setProduct({ ...product, [name]: value });
  };

  return (
    <Wrapper>
      <div className="modal">
        <span className="close" onClick={closeAddProduct}>
          <FaTimes />
        </span>
        <form onSubmit={handleSubmit}>
          <div className="formAdd">
            <div className="infoForm">
              <div className="left">
                <div className="left-header">
                  <h1>Add new product </h1>
                  <Input
                    className="inputName"
                    color="warning"
                    placeholder="Name"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="item">
                  <Select
                    color="warning"
                    name="colors"
                    onChange={select}
                    placeholder="Choose a color"
                  >
                    {colorss.map((color) => {
                      return (
                        <Option name="colors" key={color} value={color}>
                          {color}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
                <div className="item">
                  <Select
                    color="warning"
                    name="category"
                    onChange={select}
                    placeholder="Choose a category"
                  >
                    {categories.map((category) => {
                      return (
                        <Option name="category" key={category} value={category}>
                          {category}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
              <div className="right">
                <InputImage handleImg={handleImg} />
                <div className="item">
                  <Input
                    color="warning"
                    placeholder="Price"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                  />
                </div>
                <div className="item">
                  <Select
                    color="warning"
                    name="category"
                    onChange={select}
                    placeholder="Choose a company"
                  >
                    {companies.map((company) => {
                      return (
                        <Option name="company" key={company} value={company}>
                          {company}
                        </Option>
                      );
                    })}
                  </Select>
                </div>
              </div>
            </div>
            <Textarea
              className="textarea"
              minRows={2}
              color="warning"
              size="md"
              placeholder="Description"
              name="description"
              value={product.description}
              onChange={handleChange}
            />
          </div>
          <div className="imageAdd">
            {file ? (
              <img
                className="picture"
                src={URL.createObjectURL(file[0])}
                alt="upload"
              />
            ) : (
              <img className="picture" src={uploadImage} alt="123" />
            )}
            <button
              type="submit"
              className="btn btn-block"
              disabled={create_loading}
            >
              {create_loading ? "loading..." : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.724);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
  .modal {
    padding: 50px;
    border-radius: 10px;
    background-color: white;
    position: relative;

    h1 {
      margin-bottom: 40px;
      font-size: 24px;
      color: $soft-color;
    }

    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }

    form {
      display: flex;
      gap:15px;

    .formAdd{
     
      .infoForm{
        display: flex;
        gap:15px;
        .left{
          .left-header{
            height:100px;
            width:300px;
            position:relative;
            h1{
              text-align: center;
              color:#ab7b60;
              justify:center;
             }
             .inputName{
              position:absolute;
              bottom:0;
              width:300px;
             }
          }
          .item{
            margin-top:15px;
          }
        }
        .right{
          right:0;
          .item{
            margin-top:15px;
          }
        }
      }
      .textarea{
        margin-top:15px;
      }
    }
    .imageAdd{
      display:flex;
      flex-direction: column;
      .picture{
        height:200px;
            width:300px;
            border-radius: 10px;
      }
      button{
        margin-top:45px;
      }
    }
      }
    }
  }
`;
export default AddProduct;
