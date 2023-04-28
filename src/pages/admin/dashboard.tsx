import type { NextPage } from "next";
import { useState } from "react";
import { api } from "~/utils/api";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");

  const { mutate: mutateCreateGroup, isLoading: isCreatingGroup } = api.groups.create.useMutation({
    onSuccess: () => {
      alert("Success Creating Group");
    },
    onError: () => {
      alert("Error Creating Group");
    }
  });

  return (
    <div className="flex flex-col">
      <div>
        <label htmlFor="UserId" className="block text-sm font-medium leading-6 text-white">
          Group Name
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            onChange={(e) => setGroupName(e.target.value)}
            type="text"
            name="GroupName"
            id="GroupName"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <button onClick={() => {
        mutateCreateGroup({name: groupName})
      }} disabled={isCreatingGroup} type="button" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">Create Group Test</button>
    </div>
  );
}

const AddUserToGroup = () => {
  const [userId, setUserId] = useState("");
  const [groupId, setGroupId] = useState("");

  const { mutate: mutateAddUserToGroup, isLoading: isAddingUserToGroup } = api.groups.addUserToGroup.useMutation({
    onSuccess: () => {
      alert("Success Adding User to Group");
    },
    onError: () => {
      alert("Error Adding User to Group");
    }
  });

  return (
    <div className="flex flex-col">
      <div>
        <label htmlFor="UserId" className="block text-sm font-medium leading-6 text-white">
          UserId
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            onChange={(e) => setUserId(e.target.value)}
            type="text"
            name="UserId"
            id="UserId"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <div>
        <label htmlFor="GroupId" className="block text-sm font-medium leading-6 text-white">
            GroupId
        </label>
        <div className="relative mt-2 rounded-md shadow-sm">
          <input
            onChange={(e) => setGroupId(e.target.value)}
            type="text"
            name="GroupId"
            id="GroupId"
            className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>
      <button onClick={() => {
          mutateAddUserToGroup({groupId: groupId, userId: userId})}
          } 
          disabled={isAddingUserToGroup} type="button" className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">Add User to Group</button>
    </div>
  );
}

const Dashboard: NextPage = () => {
  return (
    <div>
      <h1 className="pb-4">Dashboard</h1>
      <div className="flex flex-row">
        <div className="flex flex-col">
          <CreateGroup></CreateGroup>
          <hr className="bg-white my-4"></hr>
          <AddUserToGroup></AddUserToGroup>  
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
