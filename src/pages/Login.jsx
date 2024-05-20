/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { FormRow } from "../components";
import { toast } from "react-toastify";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/user_context";
import NavLogin from "../components/NavLogin";

const initialState = {
  email: "",
  password: "",
};

function Login() {
  const { user, isLoading, loginUser } = useUserContext();
  const [values, setValues] = useState(initialState);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = values;
    if (!email || !password) {
      toast.error("Please fill out all fields");
      return;
    }
    loginUser({ email: email, password: password });
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  }, [user]);

  return (
    <>
      <NavLogin />

      <Wrapper className="page-login">
        <form className="form" onSubmit={onSubmit}>
          <FormRow
            type="email"
            name="email"
            value={values.email}
            handleChange={handleChange}
          />
          {/* password field */}
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
          />
          <button type="submit" className="btn btn-block" disabled={isLoading}>
            {isLoading ? "loading..." : "Login"}
          </button>

          <p>
            Don't have an account?
            <Link to="/register" className="register-link">
              Register
            </Link>
          </p>
          <p>
            Forgot your password?{" "}
            <Link to="/forgot-password" className="reset-link">
              Reset Password
            </Link>
          </p>
        </form>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.section`
  h3 {
    text-align: center;
  }
  .alert {
    margin-top: 3rem;
  }
  h4 {
    text-align: center;
  }
  p {
    margin: 0;
    text-align: center;
  }
  .btn {
    margin-bottom: 1.5rem;
  }
  .register-link,
  .reset-link {
    display: inline-block;
    margin-left: 0.25rem;
    text-transform: capitalize;
    color: var(--clr-primary-5);
    cursor: pointer;
  }
  .reset-link {
    margin-top: 0.25rem;
  }
  .btn:disabled {
    cursor: not-allowed;
  }
`;

export default Login;
