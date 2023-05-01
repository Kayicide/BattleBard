import type { GetStaticProps, NextPage } from "next";
import { LoadingPage } from "~/components/loading";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";

const JoinByInvitePage: NextPage<{ invite: string }> = ({ invite }) => {
  const router = useRouter();
  const { userId } = useAuth();
  const { data, isLoading } = api.groups.getByInvite.useQuery({ invite });
  const { mutate, isLoading: loadingJoin } =
    api.groups.joinGroupByInvite.useMutation({
      onSuccess: () => {
        if (data) {
          return router.push(`/group/${data.id}`);
        }
      },
      onError: () => {
        alert("Error Joining Group");
      },
    });
  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  if (!data) {
    return <h1 className="text-4xl text-red-500">Invalid Invite!</h1>;
  }

  const alreadyMember =
    data.members.filter((x) => x.userId === userId).length > 0;

  return (
    <>
      <div className="text-center">
        <h1 className="pb-4 text-6xl font-bold">{data.name}</h1>
        <h1 className="text-xl italic">
          {data.members.length} {data.members.length > 1 && <> Members</>}
          {data.members.length === 1 && <> Member</>}
        </h1>
        <button
          onClick={() => {
            mutate({ invite });
          }}
          type="button"
          disabled={loadingJoin || alreadyMember}
          className="mb-2 mt-4 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white focus:outline-none focus:ring-4 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Join
        </button>
        <h1 className="text-md text-red-500">* Already a member</h1>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const invite = slug;

  await ssg.groups.getByInvite.prefetch({ invite });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      invite,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default JoinByInvitePage;
