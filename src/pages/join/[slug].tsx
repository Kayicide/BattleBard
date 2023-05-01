import type { GetStaticProps, NextPage } from "next";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const JoinByInvitePage: NextPage<{ invite: string }> = ({ invite }) => {
  const { data, isLoading } = api.groups.getByInvite.useQuery({ invite });
  if (isLoading) {
    console.log("isloading?");
  }

  if (!data) {
    return <h1 className="text-4xl text-red-500">Invalid Invite!</h1>;
  }

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl">Trying to Join</h1>
        <span className="text-2xl font-bold"> {data.name}</span>
        <h1 className="text-xl italic">{data.members.length} Members</h1>
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
