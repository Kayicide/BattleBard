import { DocumentDuplicateIcon } from "@heroicons/react/20/solid";
import type { NextPage } from "next";
import { useState } from "react";
import { api } from "~/utils/api";

const AllUsers = () => {
  const { data, isLoading } = api.users.getAll.useQuery();

  if (!data) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {[...data].map((user) => (
        <div key={user.id} className="pb-2 pt-2">
          <div className="block max-w-sm rounded-lg border border-gray-200 bg-white p-6 pt-2 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {user.externalUsername}
            </h5>
            <div>
              <div className="flex flex-col">
                <label
                  htmlFor="UserId"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  UserId
                </label>
                <div className="relative mt-2 flex flex-row rounded-md shadow-sm">
                  <input
                    disabled={true}
                    type="text"
                    name="UserId"
                    id="UserId"
                    className="block w-full grow rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 disabled:bg-white sm:text-sm sm:leading-6"
                    value={user.id}
                  />
                  <button
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={() => navigator.clipboard.writeText(user.id)}
                    className="smooth-hover ml-1 inline-flex justify-center rounded-md p-2 text-white/50 hover:bg-gray-800 hover:text-white"
                  >
                    <DocumentDuplicateIcon className="h-5 w-5 sm:h-6 sm:w-6"></DocumentDuplicateIcon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");

  const { mutate: mutateCreateGroup, isLoading: isCreatingGroup } =
    api.groups.create.useMutation({
      onSuccess: () => {
        alert("Success Creating Group");
      },
      onError: () => {
        alert("Error Creating Group");
      },
    });

  return (
    <div className="flex flex-col">
      <div>
        <label
          htmlFor="UserId"
          className="block text-sm font-medium leading-6 text-white"
        >
          Group Name
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            onChange={(e) => setGroupName(e.target.value)}
            type="text"
            name="GroupName"
            id="GroupName"
            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <button
        onClick={() => {
          mutateCreateGroup({ name: groupName });
        }}
        disabled={isCreatingGroup}
        type="button"
        className="mb-2 mt-4 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        Create Group Test
      </button>
    </div>
  );
};

const AddUserToGroup = () => {
  const [userId, setUserId] = useState("");
  const [groupId, setGroupId] = useState("");

  const { mutate: mutateAddUserToGroup, isLoading: isAddingUserToGroup } =
    api.groups.addUserToGroup.useMutation({
      onSuccess: () => {
        alert("Success Adding User to Group");
      },
      onError: () => {
        alert("Error Adding User to Group");
      },
    });

  return (
    <div className="flex flex-col">
      <div>
        <label
          htmlFor="UserId"
          className="block text-sm font-medium leading-6 text-white"
        >
          UserId
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            onChange={(e) => setUserId(e.target.value)}
            type="text"
            name="UserId"
            id="UserId"
            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="GroupId"
          className="block text-sm font-medium leading-6 text-white"
        >
          GroupId
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            onChange={(e) => setGroupId(e.target.value)}
            type="text"
            name="GroupId"
            id="GroupId"
            className="block w-full rounded-md border-0 py-1.5 pl-4 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <button
        onClick={() => {
          mutateAddUserToGroup({ groupId: groupId, userId: userId });
        }}
        disabled={isAddingUserToGroup}
        type="button"
        className="mb-2 mt-4 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        Add User to Group
      </button>
    </div>
  );
};

const Dashboard: NextPage = () => {
  return (
    <div className="h-full">
      <h1 className="pb-4">Dashboard</h1>
      <div className="flex flex-row">
        <div className="flex w-4/12 flex-col p-4">
          <CreateGroup></CreateGroup>
          <hr className="my-4 bg-white"></hr>
          <AddUserToGroup></AddUserToGroup>
        </div>
        <div className="flex w-4/12 flex-col p-4">
          <h1>All Users:</h1>
          <div className="h-full overflow-auto">
            <AllUsers></AllUsers>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
