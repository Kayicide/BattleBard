import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { ExampleModal } from "~/components/modal";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  return (
    <>
      <div>
        <h1>Home</h1>
        <ExampleModal isOpen={false}></ExampleModal>
      </div>
    </>
  );
};

export default Home;
