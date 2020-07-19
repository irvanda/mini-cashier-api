const createUser = `INSERT INTO "user" (username, password, "createdAt", "lastLogin") VALUES ($1, $2, $3, $3) returning *`;
const authSignin = `SELECT * FROM "user" WHERE username = $1`;

export { createUser, authSignin };
