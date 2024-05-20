import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import FormRow from "../components/FormRow";

import { toast } from "react-toastify";
import { customFetch } from "../utils/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email) {
      toast.error("Please provide email");
      setLoading(false);
      return;
    }
    try {
      const resp = await customFetch.post("/auth/forgot-password", {
        email,
      });
      toast.success("Please check your email");
    } catch (error) {
      toast.error("Something went wrong, please try again");
    }
    setLoading(false);
  };

  return (
    <Wrapper className="page-login">
      <form
        className={loading ? "form form-loading" : "form"}
        onSubmit={handleSubmit}
      >
        <h4>Forgot password</h4>
        {/* single form row */}
        <FormRow
          type="email"
          name="email"
          value={email}
          handleChange={handleChange}
        />
        {/* end of single form row */}
        <button type="submit" className="btn btn-block" disabled={loading}>
          {loading ? "Please Wait..." : "Get Reset Password Link"}
        </button>
        <p>
          Already a have an account?
          <Link to="/login" className="login-link">
            Log In
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  h4,
  p {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
  }
  .login-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--primary-500);
    cursor: pointer;
  }
`;

export default ForgotPassword;
