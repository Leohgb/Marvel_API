import { Outlet } from "react-router-dom";
import Navbar from "./shared/components/Navbar";

export const App = () => {

  return (
    <div className="App">

      <Navbar />
      <Outlet />

    </div>
  );
}
