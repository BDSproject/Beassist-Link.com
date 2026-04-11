import { db } from "@/database/client";
import type { Prisma } from "@prisma/client";

// ─── Find ────────────────────────────────────────────────────────────────────

export const findUserById = (id: string) =>
  db.user.findUnique({ where: { id } });

export const findUserByEmail = (email: string) =>
  db.user.findUnique({ where: { email } });

export const findUserByUsername = (username: string) =>
  db.user.findUnique({ where: { username } });

// ─── Update ──────────────────────────────────────────────────────────────────

export const updateUser = (id: string, data: Prisma.UserUpdateInput) =>
  db.user.update({ where: { id }, data });

export const updateUserProfile = (
  id: string,
  data: { name?: string; username?: string; image?: string }
) => db.user.update({ where: { id }, data });

export const updateUserPassword = (id: string, hashedPassword: string) =>
  db.user.update({ where: { id }, data: { password: hashedPassword } });

export const completeOnboarding = (
  id: string,
  data: { name: string; company?: string | null; billingAddress?: string | null }
) =>
  db.user.update({
    where: { id },
    data: { ...data, onboardingCompleted: true } as any,
  });

// ─── Delete ──────────────────────────────────────────────────────────────────

export const deleteUser = (id: string) =>
  db.user.delete({ where: { id } });

// ─── Stats ───────────────────────────────────────────────────────────────────

export const countUsers = () => db.user.count();
