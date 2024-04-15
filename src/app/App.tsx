import { Outlet } from "react-router-dom";
import Navbar from "./shared/components/navbar/Navbar";

export const App = () => {

  return (
    <div className="App">

      <Navbar />
      <Outlet />

    </div>
  );
}
