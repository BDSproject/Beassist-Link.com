import { db } from "@/database/client";
import type { Prisma } from "@prisma/client";

// ─── BioPage ─────────────────────────────────────────────────────────────────

export const findBioPageByUserId = (userId: string) =>
  db.bioPage.findUnique({
    where: { userId },
    include: { links: { orderBy: { order: "asc" } } },
  });

export const findBioPageByUsername = (username: string) =>
  db.bioPage.findUnique({
    where: { username },
    include: { links: { where: { active: true }, orderBy: { order: "asc" } } },
  });

export const upsertBioPage = (
  userId: string,
  create: Prisma.BioPageCreateInput,
  update: Prisma.BioPageUpdateInput
) => db.bioPage.upsert({ where: { userId }, create, update });

export const updateBioPage = (userId: string, data: Prisma.BioPageUpdateInput) =>
  db.bioPage.update({ where: { userId }, data });

export const incrementBioPageViews = (username: string) =>
  db.bioPage.update({
    where: { username },
    data: { views: { increment: 1 } },
  });

// ─── BioLink ─────────────────────────────────────────────────────────────────

export const findBioLinkById = (id: string) =>
  db.bioLink.findUnique({ where: { id } });

export const createBioLink = (data: Prisma.BioLinkCreateInput) =>
  db.bioLink.create({ data });

export const updateBioLink = (id: string, data: Prisma.BioLinkUpdateInput) =>
  db.bioLink.update({ where: { id }, data });

export const deleteBioLink = (id: string) =>
  db.bioLink.delete({ where: { id } });

export const incrementBioLinkClicks = (id: string) =>
  db.bioLink.update({ where: { id }, data: { clicks: { increment: 1 } } });

export const countActiveBioLinks = (bioPageId: string) =>
  db.bioLink.count({ where: { bioPageId, active: true } });
