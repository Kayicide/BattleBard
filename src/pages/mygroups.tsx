import { NextPage } from "next";
import { useState } from "react";
import { GroupSquare } from "~/components/groupsquare";
import { LoadingPage } from "~/components/loading";
import { CreateGroupModal } from "~/components/modals/modal";
import { api } from "~/utils/api";
import { PlusSmallIcon } from "@heroicons/react/20/solid";

const MyGroups: NextPage = () => {
  const { data, isLoading } = api.groups.getByUserMembership.useQuery();
  const [newGroupOpen, setNewGroupOpen] = useState(false);

  if (isLoading) return <LoadingPage></LoadingPage>;

  if (!data) return <div>Something went wrong</div>;

  const handleOpenModal = () => {
    setNewGroupOpen(true);
  };

  const handleCloseModal = () => {
    setNewGroupOpen(false);
  };

  return (
    <div className="h-full">
      <h1>Groups</h1>
      <div className="mb-10 mt-10 grid grid-cols-1 gap-4 sm:mb-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <button
          className="hover:smooth-hover group flex cursor-pointer flex-col items-center space-y-2 rounded-md bg-gray-900/30 px-4 py-20 hover:bg-gray-900/40"
          onClick={handleOpenModal}
        >
          <a className="group-hover:smooth-hover flex h-20 w-20 items-center justify-center rounded-full bg-gray-900/70 text-white/50 group-hover:text-white">
            <PlusSmallIcon></PlusSmallIcon>
          </a>
          <a className="group-hover:smooth-hover text-center text-white/50 group-hover:text-white">
            Create group
          </a>
        </button>
        {[...data].map(({ group }) => (
          <GroupSquare {...group} key={group.id} />
        ))}
      </div>
      <CreateGroupModal
        isOpen={newGroupOpen}
        onClose={handleCloseModal}
      ></CreateGroupModal>
    </div>
  );
};

export default MyGroups;
