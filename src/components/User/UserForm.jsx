import { useNavigation, useSubmit } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "../UI/Button";
import { updateUser } from "../../store/users-slice";

function UserDetails() {
  const dispatch = useDispatch();
  const submit = useSubmit();
  const userId = useSelector((state) => state.auth.id);
  const user = useSelector((state) => state.users[userId]);
  const { email, password } = user;
  const navigation = useNavigation();
  const [isActive, setIsActive] = useState(false);
  const isSubmitting = navigation.state === "submitting";

  const [userInfos, setUserInfos] = useState([
    { label: "email", input: email },
    { label: "password", input: password },
    { label: "name", input: user.info.name || "" },
    { label: "surname", input: user.info.surname || "" },
    { label: "adress", input: user.info.adress || "" },
    { label: "currency", input: user.info.currency || "" },
  ]);

  const handleFormActivation = (e) => {
    e.preventDefault();
    setIsActive(!isActive);
  };

  const handleOnChange = (value, label) => {
    setUserInfos((prevState) =>
      prevState.map((info) =>
        info.label === label ? { ...info, input: value } : info
      )
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target)
    if (window.confirm("Are you sure?")) {
      dispatch(
        updateUser({
          id: userId,
          email: userInfos.find((info) => info.label === "email").input,
          password: userInfos.find((info) => info.label === "password").input,
          info: {
            name: userInfos.find((info) => info.label === "name").input,
            surname: userInfos.find((info) => info.label === "surname").input,
            adress: userInfos.find((info) => info.label === "adress").input,
            currency: userInfos.find((info) => info.label === "currency").input,
          },
        })
      );
      // dispatch(
      //   authActions.updateUser({
      //     email: userInfos[0].input,
      //     name: userInfos[2].input,
      //   })
      // );
      submit(event.target, { method: "patch" });
    }
  };

  return (
    <form className="max-w-2xl m-4 mx-auto" onSubmit={handleSubmit}>
      {userInfos.map(({ label, input }) => (
        <p key={label} className="mb-2 flex">
          <label htmlFor={label} className="basis-24">
            {label}
          </label>
          <input
            id={label}
            type={label === ("password" || "email") ? label : "text"}
            name={label}
            value={input}
            disabled={!isActive}
            onChange={(e) => handleOnChange(e.target.value, label)}
          />
        </p>
      ))}
      <div className="flex justify-start gap-24 mt-4">
        {isActive ? (
          <>
            <Button type="submit" disabled={isSubmitting} className="basis-1/6">
              {isSubmitting ? "Submitting" : "Save"}
            </Button>
            <Button
              type="button"
              disabled={isSubmitting}
              onClick={handleFormActivation}
              className="scale-90 basis-1/6"
            >
              {isSubmitting ? "Submitting" : "Cancel"}
            </Button>
          </>
        ) : (
          <Button onClick={handleFormActivation} className="basis-1/6">
            Edit
          </Button>
        )}
      </div>
    </form>
  );
}

export default UserDetails;
