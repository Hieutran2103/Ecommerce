import styled from "styled-components";
import er from "../assets/undraw_page_not_found_re_e9o6.svg";
import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <Wrapper>
      <img src={er} alt="error" />
      <section>
        <h3>Sorry, the page you tried cannot be found</h3>
        <Link to="/" className="btn">
          back home
        </Link>
      </section>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  height: 100vh;
  background: var(--clr-primary-10);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  img {
    position: relative;
    object-fit: center;
  }
  section {
    position: absolute;
    text-transform: none;
    margin-bottom: 2rem;
  }
`;

export default ErrorPage;
