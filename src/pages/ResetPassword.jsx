import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { customFetch } from "../utils/axios";

import FormRow from "../components/FormRow";
import { toast } from "react-toastify";
import NavLogin from "../components/NavLogin";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const query = useQuery();

  const handleChange = async (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!password) {
      toast.error("please enter password");

      setLoading(false);
      return;
    }
    try {
      const resp = await customFetch.post("/auth/reset-password", {
        password,
        token: query.get("token"),
        email: query.get("email"),
      });
      setLoading(false);
      toast.success("Success, redirecting to login page shortly");

      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <>
      <NavLogin />
      <Wrapper className="page-login">
        <form
          className={loading ? "form form-loading" : "form"}
          onSubmit={handleSubmit}
        >
          <h4>reset password</h4>
          {/* single form row */}
          <FormRow
            type="password"
            name="password"
            value={password}
            handleChange={handleChange}
          />
          {/* end of single form row */}
          <button type="submit" className="btn btn-block" disabled={loading}>
            {loading ? "Please Wait..." : "New Password"}
          </button>
        </form>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`
  h4,
  p {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
  }
`;

export default ResetPasswordForm;
