import { Role } from "@prisma/client";
import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const groupRouter = createTRPCRouter({
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
        },
      });

      return await ctx.prisma.groupMember.create({
        data: {
          userId: ctx.userId,
          groupId: group.id,
          role: Role.CREATOR
        },
      });
    }),
    addUserToGroup: adminProcedure.input(z.object({
      userId: z.string(),
      groupId: z.string()
    })).mutation(async ({ctx, input}) => {
      return await ctx.prisma.groupMember.create({
        data: {
          userId: input.userId, 
          groupId: input.groupId,
          role: Role.USER
        }, 
        include: {
          group: {
            include: {
              members: true,
            },
          },
        },
      })
    }), 
    joinGroup: privateProcedure.input(z.object({
      groupId: z.string()
    })).mutation(async ({ctx, input}) => {
      return await ctx.prisma.groupMember.create({
        data: {
          userId: ctx.userId, 
          groupId: input.groupId,
          role: Role.USER
        }, 
        include: {
          group: {
            include: {
              members: true,
            },
          },
        },
      })
    })

});
