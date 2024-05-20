/* eslint-disable react/prop-types */
import Stars from "./Stars";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import avaUser from "../assets/user.png";
import styled from "styled-components";
import { useUserContext } from "../context/user_context";
import { useProductsContext } from "../context/products_context";
day.extend(advancedFormat);

const Comments = ({ rating, comment, createdAt, title, userName, _id }) => {
  const date = day(createdAt).format("hh:mm a - MMM Do, YYYY ");
  const { user } = useUserContext();
  const { DeleteCommentProduct } = useProductsContext();
  DeleteCommentProduct;
  const handleChange = () => {
    DeleteCommentProduct(_id);
  };

  return (
    <Wrapper className="singleCmt">
      <img src={avaUser} className="avatarUser" alt="ava" />
      <div className="infoUser">
        <div className="nameUser">{userName}</div>
        <Stars stars={rating} />
        <div className="date">{date}</div>
        <div className="titleCmt">{title}</div>
        <div className="cmt">{comment}</div>
        {user?.role === "admin" ? (
          <button onClick={handleChange} className="btn">
            Delete
          </button>
        ) : null}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  margin-top: 20px;
  padding: 0 0 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  gap: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  .nameUser {
    font-size: 1rem;
    margin-bottom: 2px;
  }
  .date {
    margin-top: -0.5rem;
    font-size: 0.75rem;
  }
  .titleCmt {
    font-size: 20px;
    box-sizing: border-box;
    margin: 15px 0 10px 0;
    line-height: 20px;
  }
  .cmt {
    font-size: 14px;
    box-sizing: border-box;
    line-height: 20px;
  }
  .btn {
    margin-top: 10px;
    background: rgba(255, 181, 181, 1);
    text-transform: none;
    color: white;
    padding: 0.375rem 0.75rem;
    letter-spacing: var(--spacing);
    display: inline-block;
    transition: var(--transition);
    font-size: 0.875rem;
    cursor: pointer;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
    border-radius: var(--radius);
    border-color: transparent;
  }
  .btn:hover {
    color: var(--clr-primary-1);
    background: var(--clr-primary-7);
  }
`;

export default Comments;
