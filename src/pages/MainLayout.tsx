import { Outlet } from "react-router";
import { Navbar } from "../components/navbar/Navbar";

function MainLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export { MainLayout };
