import { db } from "@/database/client";
import type { Prisma } from "@prisma/client";

// ─── Create ──────────────────────────────────────────────────────────────────

export const createAnalyticsEvent = (data: Prisma.AnalyticsCreateInput) =>
  db.analytics.create({ data });

// ─── Find ────────────────────────────────────────────────────────────────────

export const findAnalyticsByUserId = (
  userId: string,
  options?: { take?: number; skip?: number }
) =>
  db.analytics.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    ...options,
  });

export const getClicksThisMonth = (userId: string) => {
  const start = new Date();
  start.setDate(1);
  start.setHours(0, 0, 0, 0);
  return db.analytics.count({
    where: { userId, createdAt: { gte: start } },
  });
};

export const getTopCountries = (userId: string, limit = 5) =>
  db.analytics.groupBy({
    by: ["country"],
    where: { userId, country: { not: null } },
    _count: { country: true },
    orderBy: { _count: { country: "desc" } },
    take: limit,
  });

export const getTopDevices = (userId: string) =>
  db.analytics.groupBy({
    by: ["device"],
    where: { userId, device: { not: null } },
    _count: { device: true },
    orderBy: { _count: { device: "desc" } },
  });

export const countTotalClicks = (userId: string) =>
  db.analytics.count({ where: { userId } });
