import type { RouterOutputs } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";

type Group = RouterOutputs["groups"]["getAll"][number];
export const GroupSquare = (group: Group) => {
  return (
    <Link
      className="hover:smooth-hover group relative flex cursor-pointer flex-col items-center space-y-2 rounded-md bg-gray-900 px-4 py-10 hover:bg-gray-900/80 sm:py-20"
      href={"/group/" + group.id}
    >
      <Image
        width={80}
        height={80}
        className="h-20 w-20 rounded-full object-cover object-center"
        src="https://puu.sh/JEsMb/66442748b3.jpg"
        alt="cuisine"
      />
      <h4 className="text-center text-2xl font-bold capitalize text-white">
        {group.name}
      </h4>

      {group.members.length === 1 && (
        <p className="text-white/50">{group.members.length} Member</p>
      )}
      {group.members.length > 1 && (
        <p className="text-white/50">{group.members.length} Members</p>
      )}
    </Link>
  );
};
