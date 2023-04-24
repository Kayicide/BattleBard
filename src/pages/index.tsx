import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  return (
    <>
      <div>
        <h1>Home</h1>
      </div>
    </>
  );
};

export default Home;
