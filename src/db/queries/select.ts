import { eq } from "drizzle-orm";
import { SelectUser, usersTable } from "../schema";
import { db } from "../index";

export async function getUserById(id: SelectUser["id"]): Promise<
  Array<{
    id: number;
    name: string;
    age: number;
    email: string;
  }>
> {
  return db.select().from(usersTable).where(eq(usersTable.id, id));
}
