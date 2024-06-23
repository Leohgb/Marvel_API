import { Outlet } from "react-router-dom";
import Navbar from "./shared/components/navbar/Navbar";
import { Footer } from "./shared/components/footer/Footer";

export const App = () => {
  return (
    <div>
      <div className="App">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
