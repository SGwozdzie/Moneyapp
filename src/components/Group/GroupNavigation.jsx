import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { authActions } from "../../store/auth-slice";
import { useEffect } from "react";

function GroupNavigation() {
  const location = useLocation();
  const dispatch = useDispatch();

  const stateGroupId = useSelector((state) => state.auth.activeGroup);
  const groupId = stateGroupId?.trim() || location.state?.groupId;

  useEffect(() => {
    // Set the initial state when the component mounts or when the dependencies change
    if (groupId) {
      dispatch(authActions.accessGroup({ groupId }));
    }
  }, [dispatch, groupId]);

  const menu = [
    {
      title: "Last Payments",
      id: groupId,
      link: "",
    },
    {
      title: "All Payments",
      id: groupId,
      link: `all`,
    },
    {
      title: "Edit Group",
      id: groupId,
      link: `edit`,
    },
  ];

  return (
    <nav className="bg-pink-900 rounded-lg shadow-lg">
      <ul className="flex justify-start">
        {menu.map((menuElement, index) => (
          <li key={menuElement.id + index} className="text-center basis-40">
            {menuElement.link !== undefined ? (
              <NavLink
                to={menuElement.link}
                className={({ isActive }) =>
                  isActive
                    ? "p-4 block text-stone-50 rounded-lg border-r-2 border-stone-50 transition-colors duration-300"
                    : "p-4 block text-stone-300 rounded-lg border-r-2 border-pink-900 transition-colors duration-300 hover:bg-pink-700 hover:border-stone-100"
                }
                end
              >
                {menuElement.title}
              </NavLink>
            ) : (
              <button className="block px-4 py-2 text-gray-400 bg-gray-600 rounded-md">
                In progress
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default GroupNavigation;
