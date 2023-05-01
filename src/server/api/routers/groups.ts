import { Role } from "@prisma/client";
import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const groupRouter = createTRPCRouter({
  create: privateProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const group = await ctx.prisma.group.create({
        data: {
          name: input.name,
          invite: createInviteString(),
        },
      });

      return await ctx.prisma.groupMember.create({
        data: {
          userId: ctx.userId,
          groupId: group.id,
          role: Role.CREATOR,
        },
      });
    }),
  getAll: privateProcedure.query(({ ctx }) => {
    return ctx.prisma.group.findMany({
      include: {
        members: true,
      },
    });
  }),
  get: publicProcedure
    .input(z.object({ groupId: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.group.findUnique({
        where: {
          id: input.groupId,
        },
        include: {
          members: true,
        },
      });
    }),
  getByUserMembership: privateProcedure.query(async ({ ctx }) => {
    const memberships = await ctx.prisma.groupMember.findMany({
      where: {
        userId: ctx.userId,
      },
      include: {
        group: {
          include: {
            members: true,
          },
        },
      },
    });

    return memberships;
  }),
  getByInvite: publicProcedure
    .input(z.object({ invite: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.group.findFirst({
        where: {
          invite: input.invite,
        },
        include: {
          members: true,
        },
      });
    }),
  addUserToGroup: adminProcedure
    .input(
      z.object({
        userId: z.string(),
        groupId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.groupMember.create({
        data: {
          userId: input.userId,
          groupId: input.groupId,
          role: Role.USER,
        },
        include: {
          group: {
            include: {
              members: true,
            },
          },
        },
      });
    }),
  joinGroupById: privateProcedure
    .input(
      z.object({
        groupId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.groupMember.create({
        data: {
          userId: ctx.userId,
          groupId: input.groupId,
          role: Role.USER,
        },
        include: {
          group: {
            include: {
              members: true,
            },
          },
        },
      });
    }),
  joinGroupByInvite: privateProcedure
    .input(
      z.object({
        invite: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const group = await ctx.prisma.group.findFirst({
        where: {
          invite: input.invite,
        },
      });

      if (!group) {
        return null;
      }

      const possibleMembership = await ctx.prisma.groupMember.findFirst({
        where: {
          userId: ctx.userId,
          groupId: group.id,
        },
      });

      if (possibleMembership !== null) {
        return null;
      }

      return await ctx.prisma.groupMember.create({
        data: {
          userId: ctx.userId,
          groupId: group.id,
          role: Role.USER,
        },
        include: {
          group: {
            include: {
              members: true,
            },
          },
        },
      });
    }),
});

const createInviteString = () => {
  let outString = "";
  const inOptions = "abcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < 6; i++) {
    outString += inOptions.charAt(Math.floor(Math.random() * inOptions.length));
  }

  return outString;
};
