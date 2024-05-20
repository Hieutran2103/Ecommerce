/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { customFetch } from "../utils/axios";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Comments from "../components/Comments";

import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
const SingleProductPage = () => {
  const { id } = useParams();

  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
    fetchCommentProduct,
    comments,
    countComment,
    CommentProduct,
  } = useProductsContext();

  const initialState = {
    product: `${id}`,
    rating: 3,
    title: "",
    comment: "",
  };
  const [valueForm, setValueForm] = useState(initialState);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValueForm({ ...valueForm, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { title, comment } = valueForm;
    if (!title || !comment) {
      toast.error("Please fill out all fields");
      return;
    }
    CommentProduct(valueForm);
  };

  useEffect(() => {
    fetchSingleProduct(customFetch, id);
    fetchCommentProduct(customFetch, id);
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const {
    name,
    price,
    description,
    averageRating,
    numOfReviews,
    id: idProduct,
    company,
    image,
    colors,
  } = product;

  return (
    <Wrapper>
      <PageHero title={name} product={product} />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={image} />
          <section className="content">
            <h2>{name}</h2>
            <Stars stars={averageRating} reviews={numOfReviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="decs"> {description}</p>
            <p className="info">
              <span>SKU : </span> {idProduct}
            </p>
            <p className="info">
              <span>Brand : </span> {company}
            </p>
            <hr />
            <AddToCart product={product} colors={colors} />
          </section>
        </div>
        <div className="section section-center comments">
          <h3>
            {" "}
            {countComment} Review{!countComment.length > 1 && "s"}
          </h3>
          {comments.map((singlecomment) => {
            return <Comments key={singlecomment._id} {...singlecomment} />;
          })}
        </div>
        <form className="form" onSubmit={onSubmit}>
          <div className="title">Submit your review</div>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
            className="box"
          >
            <Typography component="legend" className="rating">
              Rating
            </Typography>
            <Rating
              name="rating"
              value={valueForm.rating}
              onChange={handleChange}
              className="stars"
            />
          </Box>
          <input
            type="text"
            placeholder="Your title"
            value={valueForm.title}
            name="title"
            className="input"
            onChange={handleChange}
          />
          <textarea
            placeholder="Your comment"
            value={valueForm.comment}
            onChange={handleChange}
            name="comment"
          ></textarea>
          <button>Submit</button>
        </form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  h3 {
    color: var(--clr-primary-1);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  .form {
    margin-top: 0;
    position: relative;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
    width: 300px;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 30px 30px -30px rgba(27, 26, 26, 0.315);
  }

  .form .title {
    color: rgba(171, 122, 95, 1);
    font-size: 30px;
    font-weight: 600;
    letter-spacing: -1px;
    line-height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .form input {
    outline: 0;
    border: 1px solid rgb(219, 213, 213);
    padding: 8px 14px;
    border-radius: 8px;
    width: 100%;
    height: 50px;
  }

  .form textarea {
    border-radius: 8px;
    height: 100px;
    width: 100%;
    resize: none;
    outline: 0;
    padding: 8px 14px;
    border: 1px solid rgb(219, 213, 213);
  }

  .form button {
    align-self: flex-end;
    padding: 8px;
    outline: 0;
    border: 0;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 500;
    background-color: rgba(171, 122, 95, 1);
    color: #fff;
    cursor: pointer;
  }
  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
    .rating {
      margin-top: 0;
    }
  }
  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
