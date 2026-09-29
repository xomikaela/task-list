import db from "#db/client";

import { createTask } from "#db/queries/tasks";
import { createUser } from "#db/queries/users";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const user = await createUser("user_one", "p@ssw0rd");
  for (let i = 0; i < 3; i++) {
    await createTask({
      user_id: user.id,
      title: `Task ${i + 1}`,
      done: false,
    });
  }
}
