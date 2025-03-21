import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const AppLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

export default AppLayout;