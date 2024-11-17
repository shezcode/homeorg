import { db } from "..";
import { usersTable, InsertUser, InsertTodo, todosTable } from "../schema";

export async function createUser(data: InsertUser) {
  await db.insert(usersTable).values(data);
}

export async function createTodo(data: InsertTodo) {
  await db.insert(todosTable).values(data);
}
