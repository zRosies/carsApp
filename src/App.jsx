import Footer from "./pages/Footer";
import { Outlet } from "react-router-dom";
import Navbar from "./pages/NavBar";

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
