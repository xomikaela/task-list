import db from "#db/client";

export async function createTask({ user_id, title, done }) {
  const sql = `
    INSERT INTO
    tasks (user_id, title, done)
    VALUES ($1, $2, $3)
    RETURNING *`;
  const {
    rows: [task],
  } = await db.query(sql, [user_id, title, done]);
  return task;
}
