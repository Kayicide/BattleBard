import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const groupRouter = createTRPCRouter({
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.group.findMany();
  }),
  get: publicProcedure
    .input(z.object({ groupId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.group.findUnique({
        where: {
          id: input.groupId,
        },
      });
    }),
  getByUserMembership: privateProcedure.query(async ({ ctx }) => {
    let memberships = await ctx.prisma.groupMember.findMany({
      where: {
        userId: ctx.userId,
      },
      include: {
        group: true,
      },
    });
    return memberships;
  }),
});
