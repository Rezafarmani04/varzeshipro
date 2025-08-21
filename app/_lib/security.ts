import crypto from "crypto";
import bcrypt from "bcryptjs";

export function generateRawToken(bytes = 32) {
  return crypto.randomBytes(bytes).toString("hex");
}

export async function hashToken(token: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(token, salt);
}

export async function compareToken(raw: string, hash: string) {
  return bcrypt.compare(raw, hash);
}

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}
