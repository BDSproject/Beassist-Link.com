import crypto from "crypto";

// Chiffrement des identifiants marchands des créateurs (clés privées PayDunya...).
// AES-256-GCM : confidentialité + intégrité. Toute altération fait échouer le
// déchiffrement, donc une ligne modifiée en base ne peut pas être exploitée.

const VERSION = "v1";
const ALGO = "aes-256-gcm";
const IV_LENGTH = 12; // recommandé pour GCM

function getKey(): Buffer {
  const raw = process.env.PAYMENT_ENCRYPTION_KEY;

  if (raw) {
    const buf = /^[0-9a-f]{64}$/i.test(raw)
      ? Buffer.from(raw, "hex")
      : Buffer.from(raw, "base64");
    if (buf.length !== 32) {
      throw new Error(
        "PAYMENT_ENCRYPTION_KEY doit faire 32 octets (64 caractères hex ou 44 en base64)"
      );
    }
    return buf;
  }

  // Repli : dérivation depuis NEXTAUTH_SECRET pour ne pas casser les
  // environnements existants. Définir PAYMENT_ENCRYPTION_KEY en production
  // permet de faire tourner cette clé indépendamment de l'authentification.
  const fallback = process.env.NEXTAUTH_SECRET;
  if (!fallback) {
    throw new Error(
      "PAYMENT_ENCRYPTION_KEY ou NEXTAUTH_SECRET requis pour chiffrer les identifiants marchands"
    );
  }
  if (process.env.NODE_ENV === "production" && !raw) {
    console.warn(
      "[payments] PAYMENT_ENCRYPTION_KEY absent : dérivation depuis NEXTAUTH_SECRET. " +
        "Définis une clé dédiée pour pouvoir la faire tourner sans invalider les sessions."
    );
  }
  return crypto.hkdfSync("sha256", fallback, "beassistlink-payments", "payment-credentials", 32) as unknown as Buffer;
}

export function encryptCredentials(payload: unknown): string {
  const key = getKey();
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(ALGO, key, iv);
  const plaintext = Buffer.from(JSON.stringify(payload), "utf8");
  const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();

  return [
    VERSION,
    iv.toString("base64"),
    tag.toString("base64"),
    ciphertext.toString("base64"),
  ].join(".");
}

export function decryptCredentials<T = Record<string, string>>(stored: string): T {
  const parts = stored.split(".");
  if (parts.length !== 4 || parts[0] !== VERSION) {
    throw new Error("Identifiants marchands illisibles (format inattendu)");
  }

  const [, ivB64, tagB64, dataB64] = parts;
  const decipher = crypto.createDecipheriv(ALGO, getKey(), Buffer.from(ivB64, "base64"));
  decipher.setAuthTag(Buffer.from(tagB64, "base64"));

  const plaintext = Buffer.concat([
    decipher.update(Buffer.from(dataB64, "base64")),
    decipher.final(),
  ]);

  return JSON.parse(plaintext.toString("utf8")) as T;
}

// Masque une clé pour l'afficher sans la révéler : « pdv_live_…a4f2 »
export function maskSecret(secret: string): string {
  if (!secret) return "";
  if (secret.length <= 8) return "••••";
  return `${secret.slice(0, 4)}••••${secret.slice(-4)}`;
}
