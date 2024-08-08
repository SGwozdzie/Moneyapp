import { Outlet } from "react-router-dom";

import GroupNavigation from "../components/Group/GroupNavigation";

function GroupLayout() {
  return (
    <>
      <GroupNavigation />
      <main className="bg-stone-100 container p-2">
        <Outlet />
      </main>
    </>
  );
}

export default GroupLayout;
