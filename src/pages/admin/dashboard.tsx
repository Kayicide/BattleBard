import { NextPage } from "next";
import { api } from "~/utils/api";

const Dashboard: NextPage = () => {
  const { mutate, isLoading: isCreating } = api.groups.create.useMutation({
    onSuccess: () => {
      alert("success");
    }
  })

  const createGroupOnClick = () => {
    mutate({name: "new test"})
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={createGroupOnClick} disabled={isCreating} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none">Create Group Test</button>
    </div>
  );
};

export default Dashboard;
