import { env } from "@/lib/env.mjs";
function getBaseUrl() {
  if (typeof window !== "undefined") return "";
  if (env.VERCEL_URL) return `https://${env.VERCEL_URL}`;
  return "http://localhost:3000";
}

export function getUrl() {
  return getBaseUrl() + "/api/trpc";
}

export function formatDate(input: string | number): string {
  const date = new Date(input);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

// export function absoluteUrl(path: string) {
//   return `${env.NEXT_PUBLIC_APP_URL}${path}`;
// }

// export function slugify(string: string) {
//   return slugifyjs(string, { lower: true });
// }
