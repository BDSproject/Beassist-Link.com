import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Demo user 1 - Free plan
  const hashedPassword = await bcrypt.hash("Demo1234!", 12);

  const demoUser = await prisma.user.upsert({
    where: { email: "demo@linkassisted.com" },
    update: {},
    create: {
      name: "Demo User",
      email: "demo@linkassisted.com",
      username: "demo",
      password: hashedPassword,
      plan: "FREE",
      bioPage: {
        create: {
          username: "demo",
          title: "Demo User",
          description: "Bienvenue sur ma page ! 👋 Retrouvez tous mes liens ici.",
          primaryColor: "#8F00FF",
          bgColor: "#FFFFFF",
          theme: "default",
          links: {
            create: [
              {
                title: "Instagram",
                url: "https://instagram.com",
                icon: "📸",
                platform: "instagram",
                order: 0,
              },
              {
                title: "Twitter / X",
                url: "https://twitter.com",
                icon: "🐦",
                platform: "twitter",
                order: 1,
              },
              {
                title: "YouTube",
                url: "https://youtube.com",
                icon: "▶️",
                platform: "youtube",
                order: 2,
              },
            ],
          },
        },
      },
      links: {
        create: [
          {
            slug: "demo-link",
            url: "https://linkassisted.com",
            title: "Linkassisted",
            active: true,
          },
        ],
      },
      subscription: {
        create: {
          plan: "FREE",
          billingCycle: "MONTHLY",
          status: "ACTIVE",
        },
      },
    },
  });

  // Demo user 2 - Pro plan
  const proUser = await prisma.user.upsert({
    where: { email: "pro@linkassisted.com" },
    update: {},
    create: {
      name: "Pro Creator",
      email: "pro@linkassisted.com",
      username: "procreator",
      password: hashedPassword,
      plan: "PRO",
      bioPage: {
        create: {
          username: "procreator",
          title: "Pro Creator 🚀",
          description:
            "Content creator | Tech enthusiast | Entrepreneur\nRejoignez ma communauté !",
          primaryColor: "#8F00FF",
          bgColor: "#0A0A0A",
          theme: "dark",
          links: {
            create: [
              {
                title: "Instagram",
                url: "https://instagram.com",
                icon: "📸",
                platform: "instagram",
                order: 0,
                clicks: 1240,
              },
              {
                title: "YouTube",
                url: "https://youtube.com",
                icon: "▶️",
                platform: "youtube",
                order: 1,
                clicks: 890,
              },
              {
                title: "TikTok",
                url: "https://tiktok.com",
                icon: "🎵",
                platform: "tiktok",
                order: 2,
                clicks: 2100,
              },
              {
                title: "Mon site web",
                url: "https://linkassisted.com",
                icon: "🌐",
                platform: "website",
                order: 3,
                clicks: 456,
              },
              {
                title: "Newsletter",
                url: "https://linkassisted.com",
                icon: "📧",
                platform: "email",
                order: 4,
                clicks: 234,
              },
            ],
          },
        },
      },
      links: {
        create: [
          {
            slug: "promo2024",
            url: "https://linkassisted.com",
            title: "Promo spéciale",
            active: true,
            clicks: 512,
          },
          {
            slug: "collab",
            url: "https://linkassisted.com",
            title: "Collaboration",
            active: true,
            clicks: 128,
          },
        ],
      },
      subscription: {
        create: {
          plan: "PRO",
          billingCycle: "YEARLY",
          status: "ACTIVE",
        },
      },
    },
  });

  console.log("✅ Seeded users:");
  console.log(`   📧 ${demoUser.email} (FREE) - password: Demo1234!`);
  console.log(`   📧 ${proUser.email} (PRO) - password: Demo1234!`);
  console.log("\n🎉 Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
