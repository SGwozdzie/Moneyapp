import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";

let menu = [];

function MainNavigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.auth.isAuthenticated);
  const userId = useSelector((state) => state.auth.id);
  const loginName = useSelector((state) => state.users[userId]?.info?.name);

  const handleLogoutButton = () => {
    dispatch(authActions.logout());
    navigate("/");
  };

  menu = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: isLogged ? "Logout" : "Login",
      link: isLogged ? null : "/auth?mode=login",
    },
  ];

  if (isLogged) {
    menu[0] = {
      title: "Groups",
      link: "/groups",
    };
    menu.push({
      title: `Hello ${loginName ? loginName : "user"}!`,
      link: `/user/${userId}`,
    });
  }

  return (
      <nav className="flex px-8 py-2 bg-fuchsia-950 text-xs">
        <ul className="flex gap-8 grow">
          {menu.map((menuElement, index) => (
            <li key={index} className="text-center basis-1/6">
              {menuElement.link ? (
                <NavLink
                  to={menuElement.link}
                  className={({ isActive }) =>
                    isActive
                      ? "block m-auto text-stone-50 border-b pb-1"
                      : "block m-auto text-stone-400"
                  }
                  end
                >
                  {menuElement.title}
                </NavLink>
              ) : (
                <button
                  onClick={handleLogoutButton}
                  className="block m-auto text-stone-400"
                >
                  {menuElement.title}
                </button>
              )}
            </li>
          ))}
        </ul>
      </nav>
  );
}

export default MainNavigation;
