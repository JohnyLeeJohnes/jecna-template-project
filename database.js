import mysql from "mysql2";
import config from "./config/config.js";

export async function query(sql, params) {
    const connection = await mysql.createConnection(config.db);
    const [results,] = await connection.execute(sql, params);
    return results;
}