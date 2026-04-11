import { db } from "@/database/client";
import type { Prisma } from "@prisma/client";

// ─── Find ────────────────────────────────────────────────────────────────────

export const findLinksByUserId = (userId: string) =>
  db.link.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });

export const findLinkBySlug = (slug: string) =>
  db.link.findUnique({ where: { slug } });

export const findLinkById = (id: string) =>
  db.link.findUnique({ where: { id } });

// ─── Create ──────────────────────────────────────────────────────────────────

export const createLink = (data: Prisma.LinkCreateInput) =>
  db.link.create({ data });

// ─── Update ──────────────────────────────────────────────────────────────────

export const updateLink = (id: string, data: Prisma.LinkUpdateInput) =>
  db.link.update({ where: { id }, data });

export const incrementLinkClicks = (id: string) =>
  db.link.update({ where: { id }, data: { clicks: { increment: 1 } } });

// ─── Delete ──────────────────────────────────────────────────────────────────

export const deleteLink = (id: string) =>
  db.link.delete({ where: { id } });

// ─── Stats ───────────────────────────────────────────────────────────────────

export const countLinksByUserId = (userId: string) =>
  db.link.count({ where: { userId, active: true } });
