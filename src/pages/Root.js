import { Outlet } from "react-router-dom";

import MainNavigation from "../components/Layout/MainNavigation";

function RootLayout() {
  return (
    <div className="flex flex-col min-h-full">
      <MainNavigation />
      <main className="bg-stone-200 p-2 grow">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
