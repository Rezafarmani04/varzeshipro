import jwt, { Secret, SignOptions, JwtPayload } from "jsonwebtoken";

const JWT_SECRET_ENV = process.env.JWT_SECRET;
if (!JWT_SECRET_ENV) {
  throw new Error("❌!");
}
const JWT_SECRET: Secret = JWT_SECRET_ENV;

export function signToken(payload: object, expiresIn: string = "7d"): string {
  const options: SignOptions = {
    expiresIn: expiresIn as unknown as any,
  };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): JwtPayload | string | null {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
