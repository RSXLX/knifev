export const ADMIN_COOKIE = "lumora_admin";

export function adminPassword() {
  return process.env.ADMIN_PASSWORD || "knifev-demo";
}

export async function adminToken(password = adminPassword()) {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`lumora-admin:${password}`));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function isValidAdminToken(value: string | undefined | null) {
  if (!value) return false;
  const expected = await adminToken();
  if (value.length !== expected.length) return false;
  let diff = 0;
  for (let index = 0; index < value.length; index += 1) diff |= value.charCodeAt(index) ^ expected.charCodeAt(index);
  return diff === 0;
}
