import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import GroupForm from "../components/Group/GroupForm";
import { useSelector } from "react-redux";

function EditGroupPage() {
  const { userGroups } = useRouteLoaderData("groups");
  const groupId = useSelector((state) => state.auth.activeGroup);

  const findGroupById = (groups, id) => {
    return groups[id] || {}; // Return empty object if not found
  };

  const group = findGroupById(userGroups, groupId);

  return (
    <React.Suspense fallback={<p className="text-center">Loading...</p>}>
      {/* Assuming userGroups is already loaded by the time this component renders */}
      <GroupForm method="patch" group={group} mode="edit" groupId={groupId} />
    </React.Suspense>
  );
}

export default EditGroupPage;
