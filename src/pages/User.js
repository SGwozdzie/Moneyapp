import { json, redirect } from "react-router-dom";

import UserForm from "../components/User/UserForm";

function UserPage() {
  return <UserForm />;
}

export default UserPage;

export async function action({ request, params }) {
  const data = await request.formData(); //data put in given form
  const { id } = params;

  const userData = {
    email: data.get("email"),
    password: data.get("password"),
    info: {
      name: data.get("name"),
      surname: data.get("surname"),
      adress: data.get("adress"),
      currency: data.get("currency"),
    },
  }; //construct data object to put into backend

  const response = await fetch(
    `https://moneyapp-c5bd1-default-rtdb.europe-west1.firebasedatabase.app/users/${id}.json`,
    {
      method: "PATCH",
      body: JSON.stringify(userData),
    }
  ); //update user's info in backend
  if (response.status === 422 || response.status === 401) {
    return response;
  }
  if (!response.ok) {
    const errorData = await response.json();
    console.error("Firebase Error:", errorData);
    throw json({ message: "Could not edit user's info" }, { status: 422 });
  }

  return redirect("/groups");
}
