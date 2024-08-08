import { Outlet } from "react-router-dom";

import MainNavigation from "../components/Layout/MainNavigation";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main className="bg-stone-100 container p-2">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
