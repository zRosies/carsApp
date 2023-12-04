import Footer from "./components/headerAndFooter/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "./components/headerAndFooter/NavBar";

const App = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
