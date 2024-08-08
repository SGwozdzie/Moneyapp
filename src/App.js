import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/Root";
import ErrorPage from "./pages/Error";
import HomePage from "./pages/Home";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import UserPage, { action as userAction } from "./pages/User";
import GroupsPage, { loader as groupsLoader } from "./pages/Groups";
import NewGroupPage from "./pages/NewGroup";
import { action as manipulateGroupAction } from "./components/Group/groupActions";
import { withReduxState } from "./util/withReduxState";
import GroupMainPage from "./pages/GroupMainPage";
import GroupLayout from "./pages/RootGroup";
import EditGroupPage from "./pages/EditGroup";
import PaymentsPage from "./pages/PaymentsPage";

const router = createBrowserRouter([
  {
    path: "/",
    id: "root",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "groups",
        id: "groups",
        loader: withReduxState(groupsLoader),
        children: [
          { index: true, element: <GroupsPage /> },
          {
            path: "new",
            element: <NewGroupPage />,
            action: manipulateGroupAction,
          },
          {
            path: ":groupId",
            id: "group-main-page",
            element: <GroupLayout />,
            children: [
              { index: true, element: <GroupMainPage /> },
              {
                path: "all",
                element: <PaymentsPage />,
              },
              {
                path: "edit",
                element: <EditGroupPage />,
                action: manipulateGroupAction,
              },
            ],
          },
        ],
      },
      {
        path: "user/:id",
        id: "user-data",
        element: <UserPage />,
        action: userAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
