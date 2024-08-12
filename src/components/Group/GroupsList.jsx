import { Link } from "react-router-dom";

function GroupsList({ userGroups }) {
  return (
    <div className="p-6 font-sans w-3/5 mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Groups</h1>
      {Object.keys(userGroups).length > 0 ? (
        <ul className="space-y-4">
          {Object.keys(userGroups).map((groupId) => {
            const group = userGroups[groupId];
            if (!group) return null; // Skip if group is null

            const groupPath = `/groups/${encodeURIComponent(group.name)}`;

            return (
              <li
                key={groupId}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-md transition-transform transform hover:scale-105"
              >
                <Link to={groupPath} state={{ groupId }} className="flex">
                  <img
                    src={group.image}
                    alt={group.name}
                    className="w-48 h-32 object-cover border-r border-gray-200"
                  />
                  <div className="p-4 flex-grow">
                    <h2 className="text-xl font-semibold mb-2">{group.name}</h2>
                    <p className="text-gray-600">{group.description}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-gray-500">There are no available groups.</p>
      )}
      <Link to="new" className="inline-block btn-primary mt-2">
        Add group
      </Link>
    </div>
  );
}

export default GroupsList;
