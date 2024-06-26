import styled from "styled-components";
import { PageHero } from "../components";

// extra imports

import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";
import StripeCheckout from "../components/StripeCheckout";

const CheckoutPage = () => {
  const { items } = useCartContext();

  return (
    <main>
      <PageHero title="checkout" />
      <Wrapper className="page">
        {items.length < 1 ? (
          <div className="empty">
            <h2>Your cart is empty</h2>
            <Link to="/products" className="btn">
              fill it
            </Link>
          </div>
        ) : (
          <StripeCheckout />
        )}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
