import db from "#db/client";
import bcrypt from "bcrypt";

export async function createUser({ username, password }) {
  const sql = `
    INSERT INTO
    users (username, password)
    VALUES ($1, $2)
    RETURNING id, username;
    `;
  const hashedPassword = await bcrypt.hash(password, 10);
  const {
    rows: [user],
  } = await db.query(sql, [username, hashedPassword]);
  return user;
}

export async function getUserByUsernameandPassword(username, password) {
  //first, try to find the user by their username
  const sql = `
        SELECT * FROM users WHERE username = $1`;
  const {
    rows: [user],
  } = await db.query(sql, [username]);
  // if we didn't find a user, return null
  if (!user) return null;
  // if we do find a user, compare the password they provided to the hashed password in the database
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  return user;
}

export async function getUserById(id) {
  const sql = `
        SELECT * FROM users
        WHERE id = $1`;
  const {
    rows: [user],
  } = await db.query(sql, [id]);
  if (!user) return null;
  return user;
}
