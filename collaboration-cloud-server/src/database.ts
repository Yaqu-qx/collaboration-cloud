import mysql from "mysql2/promise";

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "hznuPYQ205257!",
  database: "db_collaborationcloud",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
export default connection;
