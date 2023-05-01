import type { GetStaticProps, NextPage } from "next";
import { LoadingPage } from "~/components/loading";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";

const Group: NextPage<{ groupId: string }> = ({ groupId }) => {
  const { data, isLoading } = api.groups.get.useQuery({ groupId });
  if (isLoading) {
    return <LoadingPage></LoadingPage>;
  }

  if (!data) {
    return <h1 className="text-4xl text-red-500">Invalid Invite!</h1>;
  }

  return (
    <>
      <div className="text-center">
        <h1 className="text-3xl font-bold"> {data.name}</h1>
        <h1 className="text-xl italic">{data.members.length} Members</h1>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const ssg = generateSSGHelper();

  const slug = context.params?.slug;

  if (typeof slug !== "string") throw new Error("no slug");

  const groupId = slug;

  await ssg.groups.get.prefetch({ groupId });

  return {
    props: {
      trpcState: ssg.dehydrate(),
      groupId,
    },
  };
};

export const getStaticPaths = () => {
  return { paths: [], fallback: "blocking" };
};

export default Group;
