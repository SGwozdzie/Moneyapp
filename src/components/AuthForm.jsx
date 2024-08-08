import {
  Form,
  Link,
  useActionData,
  useSearchParams,
  useNavigation,
  useNavigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Button from "./UI/Button";
import { authActions } from "../store/auth-slice";
import { addUser } from "../store/users-slice";

function AuthForm() {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation(); // hook which gives access to page state (loading, submitting etc.)
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (data && !data.errors) {
      const [id, users] = data;
      Object.keys(users).forEach((id) =>
        dispatch(addUser({ id, ...users[id] }))
      );
      dispatch(
        authActions.login({
          id,
        })
      );
      navigate("/groups");
    }
  }, [data, dispatch, navigate]);

  return (
    <Form
      method="post"
      className="max-w-lg mx-auto my-8 p-8 bg-fuchsia-950 text-white rounded-lg shadow-lg"
    >
      <h1 className="mb-4 font-semibold text-xl text-center">
        {isLogin ? "Log in" : "Create a new user"}
      </h1>
      {data && data.errors && (
        <ul className="mb-4">
          {Object.values(data.errors).map((err) => (
            <li key={err} className="text-red-400">
              {err}
            </li>
          ))}
        </ul>
      )}
      {data && data.message && (
        <p className="mb-4 text-green-400">{data.message}</p>
      )}
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className="block w-full px-4 py-2 rounded border border-gray-300 text-black"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <input
          id="password"
          type="password"
          name="password"
          required
          className="block w-full px-4 py-2 rounded border border-gray-300 text-black"
        />
      </div>
      <div className="flex items-center justify-between mt-4">
        <Link
          to={`?mode=${isLogin ? "signup" : "login"}`}
          className="px-2 py-1 text-gray-200 rounded border border-gray-300 hover:text-gray-50 hover:bg-fuchsia-900 transition duration-200 ease-in-out"
        >
          {isLogin ? "Create new user" : "Login"}
        </Link>
        <Button
          disabled={isSubmitting}
          className="px-4 py-2 bg-white text-fuchsia-950 rounded"
        >
          {isSubmitting ? "Submitting" : "Save"}
        </Button>
      </div>
    </Form>
  );
}

export default AuthForm;
