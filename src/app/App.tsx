import { Outlet } from "react-router-dom";
import Navbar from "./shared/components/Navbar";

export const App = ({ setSearch }: { setSearch: any }) => {

  return (
    <div className="App">
      <Navbar setSearch={setSearch} />
      <Outlet />

    </div>
  );
}
