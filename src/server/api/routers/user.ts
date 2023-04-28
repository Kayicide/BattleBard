import { clerkClient } from "@clerk/nextjs/server";
import { filterUserForClient } from "~/server/helpers/filterUserForClient";
import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  getAll: adminProcedure.query(async () => {
    const users = await clerkClient.users.getUserList();
    const filteredUsers = users.map(filterUserForClient);

    return filteredUsers;
  }),
});
