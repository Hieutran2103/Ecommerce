import { Outlet, useNavigation } from "react-router-dom";
import { Navbar, Footer, Sidebar, Loading } from "../components";

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === "loading";
  return (
    <>
      <Navbar />
      <Sidebar />

      {isPageLoading ? (
        <Loading />
      ) : (
        <section>
          <Outlet />
        </section>
      )}
      <Footer />
    </>
  );
};

export default HomeLayout;
