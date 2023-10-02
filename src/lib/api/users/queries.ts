import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { UserId, userIdSchema, users } from "@/lib/db/schema/auth";

export const getUserCredits = async (id: UserId) => {
  const { id: userId } = userIdSchema.parse({ id });
  const [u] = await db.select().from(users).where(eq(users.id, userId));

  return { user: u };
};
