import { json, redirect } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import generateId from "../util/generateId";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  if (mode !== "login" && mode !== "signup") {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }

  const data = await request.formData(); // data put in given form
  const email = data.get("email");
  const password = data.get("password");

  const response = await fetch(
    "https://moneyapp-c5bd1-default-rtdb.europe-west1.firebasedatabase.app/users.json"
  );
  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Firebase Error:", errorData);
    throw json(
      { message: "Could not access database. Try again later" },
      { status: 422 }
    );
  }
  const usersData = await response.json(); // fill users data with actual users

  let existingUser = undefined;
  let id = undefined;

  // Iterate through keys in usersData to find existingUser by email
  if (usersData) {
    Object.keys(usersData).forEach((key) => {
      if (usersData[key].email === email) {
        existingUser = usersData[key];
        id = key;
        return; // Found the user, exit the loop
      }
    });
  }

  // LOGIC FOR SIGNUP
  if (mode === "signup") {
    if (existingUser) {
      throw json({ message: "This email is already in use" }, { status: 422 });
    }
    // throw error if signup to already used email

    const id = generateId();

    const authData = {
      email,
      password,
      groups: {},
      info: {
        name: "",
        surname: "",
        adress: "",
        currency: "",
      },
    }; // construct data object to put into backend

    const patchResponse = await fetch(
      `https://moneyapp-c5bd1-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`,
      {
        method: "PATCH",
        body: JSON.stringify(authData),
      }
    ); // send constructed array of users to database
    if (patchResponse.status === 422 || patchResponse.status === 401) {
      return patchResponse;
    }
    if (!patchResponse.ok) {
      const errorData = await patchResponse.json();
      console.error("Firebase Error:", errorData);
      throw json({ message: "Could not signup." }, { status: 422 });
    }
    return redirect("/auth?mode=login");
  }
  // LOGIC FOR LOGIN
  else if (mode === "login") {
    if (!existingUser) {
      throw json(
        { message: "There is no such user. Check the email" },
        { status: 422 }
      );
    }
    if (password !== existingUser.password) {
      throw json({ message: "Wrong password!" }, { status: 422 });
    }
    return [id, usersData];
  }
  return redirect("/");
}
