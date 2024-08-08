import { json, redirect } from "react-router-dom";
import generateId from "../../util/generateId";

export const action = async ({ request, params }) => {
  const method = request.method;
  switch (method) {
    case "PUT": {
      const usersId = [];
      const data = await request.formData();
      const users = data.getAll("users").map((user) => {
        const userData = JSON.parse(user);
        usersId.push(userData.email);
        return userData;
      });

      const id = generateId();

      const groupData = {
        name: data.get("title"),
        image: data.get("image"),
        description: data.get("description"),
        users,
      };

      try {
        const groupResponse = await fetch(
          `https://moneyapp-c5bd1-default-rtdb.europe-west1.firebasedatabase.app/groups/${id}.json`,
          {
            method,
            body: JSON.stringify(groupData),
          }
        );

        if (groupResponse.status === 422 || groupResponse.status === 401) {
          return groupResponse;
        }
        if (!groupResponse.ok) {
          const errorData = await groupResponse.json();
          console.error("Firebase Error:", errorData);
          throw json({ message: "Could add group." }, { status: 422 });
        }

        await updateUserData(usersId, id); // wait for the async function to complete

        return redirect("/groups");
      } catch (error) {
        console.error("Error during operation:", error);
        throw json(
          { message: "Could not complete the operation." },
          { status: 500 }
        );
      }
    }
    case "PATCH": {
      console.log("trying to patch");
      const usersId = [];
      const data = await request.formData();
      const users = data.getAll("users").map((user) => {
        const userData = JSON.parse(user);
        usersId.push(userData.email);
        return userData;
      });

      const id = data.get("groupId");
      console.log(id);

      const groupData = {
        name: data.get("title"),
        image: data.get("image"),
        description: data.get("description"),
        users,
      };

      try {
        const groupResponse = await fetch(
          `https://moneyapp-c5bd1-default-rtdb.europe-west1.firebasedatabase.app/groups/${id}.json`,
          {
            method,
            body: JSON.stringify(groupData),
          }
        );

        if (groupResponse.status === 422 || groupResponse.status === 401) {
          return groupResponse;
        }
        if (!groupResponse.ok) {
          const errorData = await groupResponse.json();
          console.error("Firebase Error:", errorData);
          throw json({ message: "Could add group." }, { status: 422 });
        }

        await updateUserData(usersId, id); // wait for the async function to complete

        return redirect("/groups");
      } catch (error) {
        console.error("Error during operation:", error);
        throw json(
          { message: "Could not complete the operation." },
          { status: 500 }
        );
      }
    }
    case "DELETE": {
      break;
      // return fakeDeleteProject(params.id);
    }
    default: {
      throw new Response("", { status: 405 });
    }
  }
};

async function updateUserData(usersId, id) {
  try {
    const userResponse = await fetch(
      "https://moneyapp-c5bd1-default-rtdb.europe-west1.firebasedatabase.app/users.json"
    );

    if (userResponse.status === 422 || userResponse.status === 401) {
      console.error("Error response:", userResponse.status);
      return userResponse;
    }

    if (!userResponse.ok) {
      const errorData = await userResponse.json();
      console.error("Firebase Error:", errorData);
      throw json({ message: "Could not fetch users." }, { status: 422 });
    }

    const usersData = await userResponse.json();
    console.log("Fetched users data:", usersData);

    for (const email of usersId) {
      console.log("Processing email:", email);
      for (const key of Object.keys(usersData)) {
        console.log("Checking user data for key:", key);
        if (usersData[key].email === email) {
          const groupPermission = {
            [id]: true,
          };

          console.log("Matched user:", email, key, groupPermission);

          try {
            const response = await fetch(
              `https://moneyapp-c5bd1-default-rtdb.europe-west1.firebasedatabase.app/users/${key}/groups.json`,
              {
                method: "PATCH",
                body: JSON.stringify(groupPermission),
              }
            );

            if (response.status === 422 || response.status === 401) {
              throw new Error(
                `Failed to update user ${email}: ${response.status}`
              );
            }

            if (!response.ok) {
              const errorData = await response.json();
              console.error("Firebase Error:", errorData);
              throw new Error("Could not update user.");
            }

            console.log("Successfully updated user:", email);
          } catch (error) {
            console.error("Error during fetch:", error);
            throw error;
          }
        }
      }
    }
  } catch (error) {
    console.error("Error in updateUserData:", error);
    throw error;
  }
}
