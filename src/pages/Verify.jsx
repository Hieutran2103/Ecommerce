/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import { customFetch } from "../utils/axios";
import NavLogin from "../components/NavLogin";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const VerifyPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  //   const { isLoading } = useGlobalContext();
  const query = useQuery();

  const verifyToken = async () => {
    setLoading(true);
    try {
      const resp = await customFetch.post("/auth/verify-email", {
        verificationToken: query.get("token"),
        email: query.get("email"),
      });
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!loading) {
      verifyToken();
    }
  }, []);

  if (loading) {
    return (
      <>
        <NavLogin />
        <Wrapper className="page-login">
          <h2>Loading...</h2>
        </Wrapper>
      </>
    );
  }

  if (error) {
    return (
      <>
        <NavLogin />
        <Wrapper className="page-login">
          <h4>
            There was an error, please double check your verification link{" "}
          </h4>
        </Wrapper>
      </>
    );
  }

  return (
    <>
      <NavLogin />
      <Wrapper className="page-login">
        <h2>Account Confirmed</h2>
        <Link to="/login" className="btn">
          Please login
        </Link>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section``;

export default VerifyPage;
