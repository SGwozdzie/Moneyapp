import { Outlet } from "react-router-dom";

import GroupNavigation from "../components/Group/GroupNavigation";

function GroupLayout() {
  return (
    <>
      <GroupNavigation />
      <div className="p-2 w-4/5 mt-4 mx-auto border-x-2 border-pink-900">
        <Outlet />
      </div>
    </>
  );
}

export default GroupLayout;
