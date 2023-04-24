import { NextPage } from "next";
import { GroupSquare } from "~/components/groupsquare";
import { LoadingPage } from "~/components/loading";
import { api } from "~/utils/api";

const MyGroups: NextPage = () => {
  const { data, isLoading } = api.groups.getByUserMembership.useQuery();
  if (isLoading) return <LoadingPage></LoadingPage>;

  if (!data) return <div>Something went wrong</div>;

  console.log(data);

  return (
    <div>
      <h1>Groups</h1>
      <div className="mb-10 mt-10 grid grid-cols-1 gap-4 sm:mb-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {[...data].map(({ group }) => (
          <GroupSquare {...group} key={group.id} />
        ))}
      </div>
    </div>
  );
};

export default MyGroups;
