import React, { useState, useMemo, useCallback } from "react";
import {
  Form,
  useNavigate,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import Button from "../UI/Button";
import ImageLoader from "../UI/ImageLoader";

function GroupForm({ method, group, mode = "new", groupId = "null" }) {
  const id = useSelector((state) => state.auth.id);
  const loginName = useSelector((state) => state.users[id].info.name);
  const loginEmail = useSelector((state) => state.users[id].email);
  const users = useSelector(
    (state) => Object.values(state.users),
    shallowEqual
  );
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  const [selectedUsers, setSelectedUsers] = useState([
    { name: loginName, email: loginEmail },
  ]);
  const [userInput, setUserInput] = useState("");
  const [imageURL, setImageURL] = useState(group ? group.image : "");

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        !selectedUsers.some((selectedUser) => selectedUser.email === user.email)
    );
  }, [selectedUsers, users]);

  const handleCancel = () => {
    navigate("..");
  };

  const handleAddUser = useCallback(
    (e) => {
      e.preventDefault();
      const user = users.find(
        (user) =>
          `${user.info.name || user.email.split("@")[0]} | ${user.email}` ===
          userInput
      );
      if (
        user &&
        !selectedUsers.some((selectedUser) => selectedUser.email === user.email)
      ) {
        setSelectedUsers((prevUsers) => [
          ...prevUsers,
          {
            name: user.info.name || user.email.split("@")[0],
            email: user.email,
          },
        ]);
        setUserInput("");
      }
    },
    [userInput, users, selectedUsers]
  );

  const handleRemoveUser = useCallback((emailToRemove) => {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((user) => user.email !== emailToRemove)
    );
  }, []);

  const handleImageChange = (url) => {
    setImageURL(url); // Update imageURL state with new URL
  };

  return (
    <Form
      method={method}
      className="max-w-md mx-auto bg-fuchsia-950 text-xs text-stone-100 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
    >
      {data && data.errors && (
        <ul className="mb-4">
          {Object.values(data.errors).map((err) => (
            <li key={err} className="text-red-500">
              {err}
            </li>
          ))}
        </ul>
      )}
      <h1 className="text-2xl mb-4">
        {mode === "edit" ? "Editing group" : "Adding new group"}
      </h1>
      <input type="hidden" name="groupId" value={groupId} />
      <div className="mb-4 flex items-center">
        <label
          htmlFor="title"
          className="block text-gray-200 text-sm font-bold mb-2 mr-4"
        >
          Title:
        </label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={group ? group.name : ""}
          className="flex-grow shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4 flex items-center">
        <label
          htmlFor="image"
          className="block text-gray-200 text-sm font-bold mb-2 mr-4"
        >
          Image:
        </label>
        <input id="image" name="image" type="hidden" value={imageURL} />
        <ImageLoader
          image={imageURL || (group ? group.image : "")}
          onImageChange={handleImageChange}
          className="flex grow"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-gray-200 text-sm font-bold mb-2"
        >
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          rows="3"
          required
          defaultValue={group ? group.description : ""}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="users"
          className="block text-gray-200 text-sm font-bold mb-2"
        >
          Users:
        </label>
        <ul name="users" className="border border-gray-300 rounded p-2 mb-1">
          {selectedUsers.map((user) => (
            <li
              key={user.email}
              className="flex justify-between items-center mb-2"
            >
              <span>{`${user.name} | ${user.email}`}</span>
              <input
                id="users"
                name="users"
                type="hidden"
                value={JSON.stringify({ name: user.name, email: user.email })}
              />
              <button
                type="button"
                onClick={() => handleRemoveUser(user.email)}
                className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
              >
                X
              </button>
            </li>
          ))}
        </ul>
        {filteredUsers.length > 0 && (
          <>
            <input
              list="users-list"
              name="users-list"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
            <datalist id="users-list">
              {filteredUsers.map((user) => (
                <option key={user.email}>
                  {`${user.info.name || user.email.split("@")[0]} | ${
                    user.email
                  }`}
                </option>
              ))}
            </datalist>
            <Button
              type="button"
              onClick={handleAddUser}
              className="mt-2"
              disabled={isSubmitting}
            >
              Add User
            </Button>
          </>
        )}
      </div>
      <div className="flex justify-between">
        <Button type="button" onClick={handleCancel} className="bg-red-500">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </Form>
  );
}

export default GroupForm;
