import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import {
  // json,
  defer,
  Await,
  useRouteLoaderData,
  redirect,
} from "react-router-dom";

import GroupsList from "../components/Group/GroupsList";
import { authActions } from "../store/auth-slice";

function GroupsPage() {
  const isLogged = useSelector((state) => state.auth.isAuthenticated);
  const { userGroups } = useRouteLoaderData("groups");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authActions.accessGroup({ groupId: null }));
  }, [dispatch]);

  return (
    <>
      {isLogged ? (
        <Suspense fallback={<p className="text-center">Loading...</p>}>
          <Await resolve={userGroups}>
            {(loadedGroups) => <GroupsList userGroups={loadedGroups} />}
          </Await>
        </Suspense>
      ) : (
        <div>
          <p className="text-center">
            Please make sure you login before you attempt to check your groups
          </p>
        </div>
      )}
    </>
  );
}

export default GroupsPage;

async function userGroupsLoader(groupIds) {
  const fetchGroupPromises = groupIds.map((id) =>
    fetch(
      `https://moneyapp-c5bd1-default-rtdb.europe-west1.firebasedatabase.app/groups/${id}.json`
    )
  );

  try {
    const responses = await Promise.all(fetchGroupPromises);

    // Check if all responses are okay
    responses.forEach((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch one or more groups.");
      }
    });

    const groupsArray = await Promise.all(
      responses.map((response) => response.json())
    );

    // Construct an object with group IDs as keys
    const groupsObject = groupIds.reduce((acc, id, index) => {
      acc[id] = groupsArray[index];
      return acc;
    }, {});

    return groupsObject;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw new Error("Could not fetch group data.");
  }
}

export async function loader({ params, state }) {
  const userId = state.auth.id; // Get the user id from the Redux state
  const isAuthenticated = state.auth.isAuthenticated; // Get the auth status from the Redux state

  if (!isAuthenticated) {
    return redirect("/auth");
  }

  // Get the group IDs from the Redux state
  const groups = state.users[userId]?.groups || {}; // Ensure it's an object
  const groupIds = Object.keys(groups).filter((id) => groups[id] === true);

  // Fetch the groups based on these IDs
  return defer({
    userGroups: await userGroupsLoader(groupIds),
  });
}

// Example of dispatching updateUserGroups
// const updatedGroups = {
//   "group1": true,
//   "group2": true,
// };

// dispatch(updateUserGroups({ userId: "user1", groups: updatedGroups }));
